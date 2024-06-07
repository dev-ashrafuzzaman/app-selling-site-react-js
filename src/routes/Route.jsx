import { createBrowserRouter } from "react-router-dom";

import NotFoundPage from "../NotFoundPage";
import Login from "../pages/auth/Login";
import Home from "../pages/dashboard/Home";
import Dashboard from "../layout/Dashboard";
import ManageCustomer from "../pages/dashboard/ManageCustomer/ManageCustomer";
import AddCustomer from "../pages/dashboard/ManageCustomer/AddCustomer";
import UpdateCustomer from "../pages/dashboard/ManageCustomer/UpdateCustomer";
import TrackCustomer from "../pages/dashboard/ManageCustomer/TrackCustomer";
import ManagePayment from "../pages/dashboard/ManagePayment/ManagePayment";
import PendingWithdraw from "../pages/dashboard/ManageWithdraw/PendingWithdraw";
import ApprovedWithdraw from "../pages/dashboard/ManageWithdraw/ApprovedWithdraw";
import RejectedWithdraw from "../pages/dashboard/ManageWithdraw/RejectedWithdraw";
import LinkSetup from "../pages/dashboard/LinkSetup/LinkSetup";
import Packages from "../pages/dashboard/Packages/Packages";
import ManageBlockCustomer from "../pages/dashboard/ManageCustomer/ManageBlockCustomer";
import App from "../App";
import UserAuth from "../pages/user/auth/UserAuth";
import UserAuthRegister from "../pages/user/auth/UserAuthRegister";
import WebDashboard from "../layout/WebDashboard";
import PrivateRoute from "./PrivateRoute";
import WebHome from "../pages/user/dashboard/WebHome";
import UserInbox from "../pages/user/dashboard/Inbox/UserInbox";
import Job from "../pages/user/dashboard/Job/Job";
import DailyEarn from "../pages/user/dashboard/DailyEarn/DailyEarn";
import WithdrawType from "../pages/user/dashboard/Withdraw/WithdrawType";
import WithdrawHistory from "../pages/user/dashboard/WithdrawHistory/WithdrawHistory";
import Refer from "../pages/user/dashboard/Refer/Refer";
import WorkInfo from "../pages/user/dashboard/Job/WorkInfo";
import ChangePassword from "../pages/user/dashboard/ChangePassword/ChangePassword";
import UserWithdraw from "../pages/user/dashboard/Withdraw/UserWithdraw";
import DirectLink from "../pages/user/dashboard/DailyEarn/DirectLink";
import VisitEarn from "../pages/user/dashboard/DailyEarn/VisitEarn";
import VisitEarnDetails from "../pages/user/dashboard/DailyEarn/VisitEarnDetails";
import DirectLinkDetails from "../pages/user/dashboard/DailyEarn/DirectLinkDetails";
import AddJob from "../pages/dashboard/ManageJobs/AddJob";
import ManageJobs from "../pages/dashboard/ManageJobs/ManageJobs";
import JobsSubmit from "../pages/dashboard/ManageJobs/JobsSubmit";
import AddDirectLink from "../pages/dashboard/ManageDirectLinks/AddDirectLink";
import ManageDirectLinks from "../pages/dashboard/ManageDirectLinks/ManageDirectLinks";
import SubmitDirectLink from "../pages/dashboard/ManageDirectLinks/SubmitDirectLink";
import WorkHistory from "../pages/user/dashboard/WorkHistory/WorkHistory";
import DailyChecking from "../pages/user/dashboard/DailyEarn/DailyChecking";
import AddVisitEarn from "../pages/dashboard/ManageVisitEarn/AddVisitEarn";
import ManageVisitEarn from "../pages/dashboard/ManageVisitEarn/ManageVisitEarn";
import ViewProduct from "../components/website/Products/ViewProduct";
import Checkout from "../components/website/Checkout/Checkout";
import Orders from "../components/website/Orders/Orders";
import AllProducts from "../components/website/Products/AllProducts";
import Products from "../components/website/Products/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "admin/auth/validation",
    element: <Login></Login>,
  },
  {
    path: "user/auth/login",
    element: <UserAuth></UserAuth>,
  },
  {
    path: "user/auth/register",
    element: <UserAuthRegister></UserAuthRegister>,
  },
  {
    path: "software",
    element: <Products></Products>,
  },
  {
    path: "user/orders",
    element: (
      <PrivateRoute>
        <Orders></Orders>
      </PrivateRoute>
    ),
  },
  {
    path: "product/details/:id",
    element: (
      <PrivateRoute>
        <ViewProduct></ViewProduct>
      </PrivateRoute>
    ),
    loader: ({ params }) =>
      fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/web/public/product/${
          params.id
        }`
      ),
  },
  {
    path: "product/checkout/:id",
    element: (
      <PrivateRoute>
        <Checkout></Checkout>
      </PrivateRoute>
    ),
    loader: ({ params }) =>
      fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/web/public/product/${
          params.id
        }`
      ),
  },
  {
    path: "user/auth/dashboard",
    element: (
      <PrivateRoute>
        <WebDashboard></WebDashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "home",
        element: (
          <PrivateRoute>
            <WebHome></WebHome>
          </PrivateRoute>
        ),
      },
      {
        path: "user-inbox",
        element: <UserInbox></UserInbox>,
      },
      {
        path: "job",
        element: <Job></Job>,
      },
      {
        path: "work-info/:id",
        element: <WorkInfo></WorkInfo>,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/web/public/job/${
              params.id
            }`
          ),
      },
      {
        path: "daily-earn",
        element: <DailyEarn></DailyEarn>,
      },
      {
        path: "daily-checking",
        element: <DailyChecking></DailyChecking>,
      },
      {
        path: "direct-link",
        element: <DirectLink></DirectLink>,
      },
      {
        path: "direct-link/:id",
        element: <DirectLinkDetails></DirectLinkDetails>,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/web/user/direct-link/${
              params.id
            }`
          ),
      },
      {
        path: "visit-earn",
        element: <VisitEarn></VisitEarn>,
      },
      {
        path: "visit-earn/:id",
        element: <VisitEarnDetails></VisitEarnDetails>,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/web/user/visit-earn/${
              params.id
            }`
          ),
      },
      {
        path: "withdraw-type",
        element: <WithdrawType></WithdrawType>,
      },
      {
        path: "withdraw/:id",
        element: <UserWithdraw>,</UserWithdraw>,
      },
      {
        path: "withdraw-history",
        element: <WithdrawHistory></WithdrawHistory>,
      },
      {
        path: "work-history",
        element: <WorkHistory></WorkHistory>,
      },
      {
        path: "refer",
        element: <Refer></Refer>,
      },
      {
        path: "change-password",
        element: <ChangePassword></ChangePassword>,
      },
    ],
  },
  {
    path: "leery/admin/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "home",
        element: <Home></Home>,
      },
      {
        path: "add-user",
        element: <AddCustomer></AddCustomer>,
      },
      {
        path: "manage-users",
        element: <ManageCustomer></ManageCustomer>,
      },
      {
        path: "block-user",
        element: <ManageBlockCustomer></ManageBlockCustomer>,
      },
      {
        path: "update-user/:id",
        element: <UpdateCustomer></UpdateCustomer>,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/public/user/${params.id}`
          ),
      },
      {
        path: "track-user/:id",
        element: <TrackCustomer></TrackCustomer>,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/public/track/user/${
              params.id
            }`
          ),
      },
      {
        path: "users-payment",
        element: <ManagePayment></ManagePayment>,
      },
      {
        path: "pending-withdraw",
        element: <PendingWithdraw></PendingWithdraw>,
      },
      {
        path: "approved-withdraw",
        element: <ApprovedWithdraw></ApprovedWithdraw>,
      },
      {
        path: "rejected-withdraw",
        element: <RejectedWithdraw></RejectedWithdraw>,
      },
      {
        path: "add-job",
        element: <AddJob></AddJob>,
      },
      {
        path: "manage-job",
        element: <ManageJobs></ManageJobs>,
      },
      {
        path: "user-job-submit",
        element: <JobsSubmit></JobsSubmit>,
      },
      {
        path: "add-direct-link",
        element: <AddDirectLink></AddDirectLink>,
      },
      {
        path: "manage-direct-link",
        element: <ManageDirectLinks></ManageDirectLinks>,
      },
      {
        path: "user-direct-link-submit",
        element: <SubmitDirectLink></SubmitDirectLink>,
      },
      {
        path: "add-visit-earn",
        element: <AddVisitEarn></AddVisitEarn>,
      },
      {
        path: "manage-visit-earn",
        element: <ManageVisitEarn></ManageVisitEarn>,
      },
      {
        path: "web-setup",
        element: <LinkSetup></LinkSetup>,
      },
      {
        path: "packages",
        element: <Packages></Packages>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);
