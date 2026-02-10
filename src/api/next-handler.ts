type ExpressLikeRequest = {
  query: Record<string, string>;
  params: Record<string, string>;
  body: Record<string, unknown>;
};

type ExpressLikeResponse = {
  status: (code: number) => ExpressLikeResponse;
  json: (data: unknown) => ExpressLikeResponse;
  send: (data: unknown) => ExpressLikeResponse;
};

type ExpressController = (
  req: ExpressLikeRequest,
  res: ExpressLikeResponse
) => Promise<void> | void;

const parseBody = async (request: Request): Promise<Record<string, unknown>> => {
  if (request.method === "GET" || request.method === "HEAD") {
    return {};
  }

  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      const data = await request.json();
      if (data && typeof data === "object") {
        return data as Record<string, unknown>;
      }
      return {};
    } catch {
      return {};
    }
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await request.text();
    return Object.fromEntries(new URLSearchParams(text));
  }

  const text = await request.text();
  if (!text) {
    return {};
  }

  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === "object") {
      return parsed as Record<string, unknown>;
    }
    return {};
  } catch {
    return {};
  }
};

export const createNextHandler = (controller: ExpressController) => {
  return async (
    request: Request,
    context?: { params?: Record<string, string> }
  ) => {
    const url = new URL(request.url);
    const query: Record<string, string> = {};

    for (const [key, value] of url.searchParams.entries()) {
      if (!(key in query)) {
        query[key] = value;
      }
    }

    const body = await parseBody(request);

    let statusCode = 200;
    let responseBody: BodyInit | null = null;
    const headers = new Headers();

    const res: ExpressLikeResponse = {
      status(code) {
        statusCode = code;
        return res;
      },
      json(data) {
        headers.set("content-type", "application/json");
        responseBody = JSON.stringify(data);
        return res;
      },
      send(data) {
        if (typeof data === "string") {
          headers.set("content-type", "text/plain; charset=utf-8");
          responseBody = data;
          return res;
        }

        headers.set("content-type", "application/json");
        responseBody = JSON.stringify(data);
        return res;
      }
    };

    const maybeParams = context?.params;
    const params =
      maybeParams && typeof (maybeParams as Promise<Record<string, string>>).then === "function"
        ? await maybeParams
        : maybeParams || {};

    await controller(
      {
        query,
        params,
        body
      },
      res
    );

    if (responseBody === null) {
      responseBody = "";
    }

    return new Response(responseBody, {
      status: statusCode,
      headers
    });
  };
};
