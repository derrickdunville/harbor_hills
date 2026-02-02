import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import user_routes from './routes/users_routes.js';
import home_routes from "./routes/homes_routes.js";
import roles_routes from "./routes/roles_routes.js";
import boat_slip_routes from "./routes/boat_slips_routes.js";
import board_seat_routes from "./routes/board_seat_routes.js";
import dashboard_routes from "./routes/dashboard_routes.js";
import events_routes from "./routes/events_routes.js";
import content_sections_routes from "./routes/content_sections_routes.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/health', (req, res) => {
    res.status(200).send({status: 'OK', message: 'Server is healthy'});
});

app.use('/api/users', user_routes);
app.use('/api/homes', home_routes);
app.use('/api/roles', roles_routes);
app.use('/api/boat_slips', boat_slip_routes);
app.use('/api/board_seats', board_seat_routes);
app.use('/api/dashboard', dashboard_routes);
app.use('/api/events', events_routes);
app.use('/api/content_sections', content_sections_routes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
