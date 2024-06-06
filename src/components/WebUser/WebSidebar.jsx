import { ChevronFirst, ChevronLast } from 'lucide-react';
import { useState } from 'react';
import { MdHome, MdInbox, MdLogout, MdPassword, MdWallet, MdWorkspaces } from 'react-icons/md';
import { Sidebar, Menu, MenuItem, sidebarClasses, menuClasses } from 'react-pro-sidebar';
import { NavLink, useNavigate } from 'react-router-dom';
import { softInfo } from '../../utils/info';
import useAuth from '../../hooks/useAuth';
import { HandleLogout } from '../../utils/HandleLogout';
import { FaHistory, FaLayerGroup, FaWallet } from 'react-icons/fa';
import useWebUser from '../../hooks/web/useWebUser';

const WebSidebar = ({ toggled, setToggled }) => {
  const { WebUserLogout } = useAuth();
  const [isWebUser, refetch] = useWebUser()
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuItemClick = () => {
    refetch()
    if (!collapsed) {
      setToggled(false);
    }
  };

  return (
    <>
      {isWebUser.webUser &&
        <Sidebar
          onBackdropClick={() => setToggled(false)}
          toggled={toggled}
          breakPoint="sm"
          collapsed={collapsed}
          transitionDuration={800}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: 'white',
              minHeight: '100vh',
              border: '1px solid #f2f2f2',
              boxShadow: '2px 2px #f2f2f2'
            },
          }}
        >
          <Menu
            rootStyles={{
              ['.' + menuClasses.button]: {
                color: `${softInfo.textCode}`,
                '&:hover': {
                  backgroundColor: `${softInfo.hoverCode}`,
                },
              },
            }}
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: `${softInfo.colorCode}`,
                  color: `${softInfo.hovertextCode}`,
                },
              },
            }}
          >
            <div>
              <div className="p-4 pb-8 flex justify-between items-center">
                <img
                  src="https://i.ibb.co/R3DKhng/Techmicrowork-logo.png" alt="Leery iT"
                  className={`${collapsed ? "hidden" : "w-40"
                    }`}
                />
                <button
                  onClick={() => setCollapsed((curr) => !curr)}
                  className="p-1.5 md:rounded-lg bg-gray-50 hover:bg-gray-100 absolute end-0"
                >
                  {collapsed ? <ChevronFirst /> : <ChevronLast />}
                </button>
              </div>
            </div>
            <MenuItem
              icon={<MdHome></MdHome>}
              component={<NavLink to="/user/auth/dashboard/home" />}
              onClick={handleMenuItemClick}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              icon={<MdInbox></MdInbox>}
              component={<NavLink to="/user/auth/dashboard/user-inbox" />}
              onClick={handleMenuItemClick}
            >
              Inbox
            </MenuItem>
            <MenuItem
              icon={<MdWorkspaces></MdWorkspaces>}
              component={<NavLink to="/user/auth/dashboard/job" />}
              onClick={handleMenuItemClick}
            >
              Job
            </MenuItem>
            <MenuItem
              icon={<MdWallet></MdWallet>}
              component={<NavLink to="/user/auth/dashboard/daily-earn" />}
              onClick={handleMenuItemClick}
            >
              Daily Earn
            </MenuItem>
            <MenuItem
              icon={<FaWallet></FaWallet>}
              component={<NavLink to="/user/auth/dashboard/withdraw-type" />}
              onClick={handleMenuItemClick}
            >
              Withdraw
            </MenuItem>
            <MenuItem
              icon={<FaHistory></FaHistory>}
              component={<NavLink to="/user/auth/dashboard/withdraw-history" />}
              onClick={handleMenuItemClick}
            >
              Withdraw History
            </MenuItem>
            <MenuItem
              icon={<FaHistory></FaHistory>}
              component={<NavLink to="/user/auth/dashboard/work-history" />}
              onClick={handleMenuItemClick}
            >
              Work History
            </MenuItem>
            <MenuItem
              icon={<FaLayerGroup></FaLayerGroup>}
              component={<NavLink to="/user/auth/dashboard/refer" />}
              onClick={handleMenuItemClick}
            >
              Refer
            </MenuItem>
            <MenuItem
              icon={<MdPassword></MdPassword>}
              component={<NavLink to="/user/auth/dashboard/change-password" />}
              onClick={handleMenuItemClick}
            >
              Change Password
            </MenuItem>
            <MenuItem
              icon={<MdLogout></MdLogout>}
              onClick={() => {
                HandleLogout(WebUserLogout, navigate);
                handleMenuItemClick();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      }
    </>
  );
};

export default WebSidebar;