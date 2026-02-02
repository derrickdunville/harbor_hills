"use client";

import React from "react";
import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { BoatSlip } from "@/app/admin/types/boatSlip";
import {useColorModeValue} from "@/components/ui/color-mode";

const createBoatIcon = (isAvailable: boolean, isHighlighted: boolean) => {
  const size = isHighlighted ? 22 : 16;
  const color = isHighlighted ? "#f6c453" : (isAvailable ? "#38A169" : "#2b6cb0");
  const glow = isHighlighted ? "0 0 12px rgba(246, 196, 83, 0.9)" : "0 0 6px rgba(0,0,0,0.7)";

  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: ${glow};
      transition: all 0.2s ease-in-out;
    "></div>`,
    className: "boat-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

export default function VectorLagoonMap({
                                          height = "680px",
                                          width = "100%",
                                          slips = [],
                                          highlightedSlipIds,
                                          focusSlipId,
                                          mapBackground,
                                        }: {
  height?: string;
  width?: string;
  slips?: BoatSlip[];
  highlightedSlipIds?: Set<number>;
  focusSlipId?: number | null;
  mapBackground?: string;
}) {
  const bounds: L.LatLngBoundsExpression = [[0, 0], [1000, 1000]];
  const maxBounds: L.LatLngBoundsExpression = [[0, 0], [1100, 1100]];
  const center: [number, number] = [500, 500];
  const imageUrl = "/Lagoon.svg";
  const mapRef = React.useRef<L.Map | null>(null);
  const markerRefs = React.useRef<Map<number, L.Marker>>(new Map());
  const resolvedMapBackground = useColorModeValue("#ffffff", "#0d141c");
  const controlBg = useColorModeValue("#ffffff", "rgba(13, 20, 24, 0.92)");
  const controlFg = useColorModeValue("#0b2f4a", "#c5d8e6");
  const controlBorder = useColorModeValue("rgba(12, 28, 41, 0.16)", "rgba(229, 238, 241, 0.16)");

  React.useEffect(() => {
    if (!focusSlipId) {
      mapRef.current?.closePopup();
      return;
    }
    const marker = markerRefs.current.get(focusSlipId);
    if (marker) {
      marker.openPopup();
      mapRef.current?.panTo(marker.getLatLng(), { animate: true });
    }
  }, [focusSlipId]);

  React.useEffect(() => {
    const container = mapRef.current?.getContainer();
    if (container) {
      container.style.backgroundColor = resolvedMapBackground;
    }
  }, [resolvedMapBackground]);

  const recenterMap = React.useCallback(() => {
    mapRef.current?.setView(center, 0, { animate: true });
  }, [center]);

  return (
    <Box style={{ height, width, background: resolvedMapBackground, position: "relative" }}>
      <Button
        size="sm"
        position="absolute"
        top="14px"
        right="14px"
        zIndex={1500}
        borderRadius="full"
        bg={controlBg}
        color={controlFg}
        borderWidth="1px"
        borderColor={controlBorder}
        _hover={{ bg: controlBg }}
        _active={{ bg: controlBg }}
        onClick={recenterMap}
      >
        Re-center
      </Button>
      <MapContainer
        className="lagoon-map"
        crs={L.CRS.Simple}
        bounds={bounds}
        center={center}
        zoom={0}
        maxZoom={5}
        minZoom={-0.5}
        dragging={true}
        attributionControl={false}
        maxBounds={maxBounds}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%", backgroundColor: resolvedMapBackground }}
        ref={mapRef}
      >
        <ImageOverlay url={imageUrl} bounds={bounds} zIndex={1} />

        {slips.map((slip: BoatSlip) => {
          if (!slip.lat || !slip.lng) return null;

          const position: [number, number] = [parseFloat(slip.lat), parseFloat(slip.lng)];
          const isAvailable = !slip.home;
          const isHighlighted = highlightedSlipIds?.has(slip.id) ?? false;

          return (
            <Marker
              key={slip.id}
              position={position}
              icon={createBoatIcon(isAvailable, isHighlighted)}
              zIndexOffset={isHighlighted ? 2000 : 1000}
              ref={(marker) => {
                if (marker) markerRefs.current.set(slip.id, marker);
                else markerRefs.current.delete(slip.id);
              }}
              // This event handler ensures Leaflet's JS margin is killed on mount
              eventHandlers={{
                popupopen: (e) => {
                  const contentNode = e.popup.getElement()?.querySelector('.leaflet-popup-content');
                  if (contentNode instanceof HTMLElement) {
                    contentNode.style.margin = "0";
                    contentNode.style.width = "max-content";
                  }
                }
              }}
            >
              <Popup
                className="lagoon-popup"
                offset={[0, -8]}
                minWidth={150}
              >
                {/* Chakra Stack now provides 100% of the spacing control */}
                <Stack gap="1" p="4" minW="max-content">
                  <Flex alignItems="center" gap="10px">
                    <Badge
                      variant="solid"
                      colorPalette={isAvailable ? "green" : "blue"}
                      borderRadius="full"
                      fontSize="11px"
                      px="10px"
                      py="1px"
                    >
                      {isAvailable ? "Available" : "Assigned"}
                    </Badge>
                    <Text as="span" fontWeight="800" fontSize="md" color="var(--popup-fg, var(--foreground))">
                      #{slip.stall_number}
                    </Text>
                  </Flex>
                  {slip.home?.address_line_1 &&
                    <Text
                      as="span"
                      fontWeight="600"
                      fontSize="sm"
                      color="var(--popup-fg, var(--foreground))"
                      opacity={0.85}
                      whiteSpace="nowrap"
                    >
                      {slip.home?.address_line_1}
                    </Text>
                  }
                </Stack>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Box>
  );
}
