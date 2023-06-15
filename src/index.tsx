import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router";
import { BrowserRouter, useParams,redirect } from "react-router-dom";
import DashboardPage from "./pages";
import SignInPage from "./pages/authentication/sign-in";
import Events from "./pages/event/event";
import UserListPage from "./pages/users/list";
import CategoriesListPage from "./pages/categories/categories";
import LocationListPage from "./pages/location/location";
import FacultiesListPage from "./pages/faculties/faculties";
import ScalesListPage from "./pages/scales/scales";
import AttendeeListPage from "./pages/attendee/attendee";
import store from './redux/store'
import { Provider, useSelector } from "react-redux";
import SinglePage from "./pages/event/watchEvent";
const container = document.getElementById("root");
if (!container) {
  throw new Error("React root element doesn't exist!");
}
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <Flowbite theme={{ theme }}>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<DashboardPage />} index />
            <Route path="/" element={<SignInPage />} />
            <Route
              path="/events/list"
              element={<Events />}
            />
            <Route path="/users/list" element={<UserListPage />} />
            <Route path="/users/list/edit/:id" element={<UserListPage />} />
            <Route path="/users/list/ban/:id" element={<UserListPage />} />
            <Route path="/users/list/unban/:id" element={<UserListPage />} />
            <Route path="/events/list" element={<Events />} />
            <Route path="/events/list/watch/:id" element={<SinglePage />} />
            <Route path="/events/list/delete/:id" element={<Events />} />
            <Route path="/categories/list" element={<CategoriesListPage />} />
            <Route path="/categories/list/edit/:id" element={<CategoriesListPage />} />
            <Route path="/categories/list/delete/:id" element={<CategoriesListPage />} />
            <Route path="/location/list" element={<LocationListPage />} />
            <Route path="/location/list/edit/:id" element={<LocationListPage />} />
            <Route path="/location/list/delete/:id" element={<LocationListPage />} />
            <Route path="/faculties/list" element={<FacultiesListPage />} />
            <Route path="/faculties/list/edit/:id" element={<FacultiesListPage />} />
            <Route path="/faculties/list/delete/:id" element={<FacultiesListPage />} />
            <Route path="/scales/list" element={<ScalesListPage />} />
            <Route path="/scales/list/edit/:id" element={<ScalesListPage />} />
            <Route path="/scales/list/delete/:id" element={<ScalesListPage />} />
            <Route path="/attendees/list" element={<AttendeeListPage />} />
            <Route path="/attendees/list/edit/:id" element={<AttendeeListPage />} />
            <Route path="/attendees/list/delete/:id" element={<AttendeeListPage />} />
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </Provider>
  </StrictMode>
);
