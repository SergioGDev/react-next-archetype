import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";

export const LoginRoutes = () => {
  return (
    <Routes>
      {/* Here add the pages */}

      <Route path="/" element={<LoginPage />} />
      {/* <Route path='/settings' element={ <SettingsPage />} /> */}
      {/* <Route path='/user-list' element={ <UserListPage />} /> */}

      {/* Here add the redirect path */}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
