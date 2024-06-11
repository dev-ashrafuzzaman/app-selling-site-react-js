import { ChevronFirst, ChevronLast } from 'lucide-react';
import { useState } from 'react';
import { MdAdd, MdApproval, MdBlock, MdDoneOutline, MdHome, MdLink, MdList, MdListAlt, MdOutbox, MdPending, MdSupervisedUserCircle, MdViewList, MdWork } from 'react-icons/md';
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses, menuClasses } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import { softInfo } from '../utils/info';
import { FaDirections, FaFirstOrder } from 'react-icons/fa';

const SidebarComponent = ({ toggled, setToggled }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sidebar
      onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="sm"
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
            color: `${softInfo.colorCode}`,
            '&:hover': {
              backgroundColor: `${softInfo.hoverCode}`,
            },
          },
        }}
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: `${softInfo.hoverCode}`,
              color: `${softInfo.colorCode}`,
            },
          },
        }}
      >
        <div>
          <div className="p-4 pb-8 flex justify-between items-center">
           <h2  className={`${collapsed ? "hidden" : "w-40 font-bold text-lg"
                }`}>Faster App Maker</h2>
            <button
              onClick={() => setCollapsed((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 absolute end-0"
            >
              {collapsed ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>
        </div>
        <MenuItem icon={<MdHome></MdHome>} component={<NavLink to="/leery/admin/dashboard/home" />}>Home</MenuItem>
        <SubMenu label="Users" icon={<MdSupervisedUserCircle></MdSupervisedUserCircle>}>
          <MenuItem icon={<MdList></MdList>} component={<NavLink to="/leery/admin/dashboard/manage-users" />}>Users List</MenuItem>
          {/* <MenuItem icon={<MdAdd></MdAdd>} component={<NavLink to="/leery/admin/dashboard/add-user" />}>Add Users</MenuItem> */}
          <MenuItem icon={<MdBlock></MdBlock>} component={<NavLink to="/leery/admin/dashboard/block-user" />}>blocked Users</MenuItem>
        </SubMenu>
        <MenuItem icon={<FaFirstOrder></FaFirstOrder>} component={<NavLink to="/leery/admin/dashboard/manage-orders" />}>Orders</MenuItem>
        {/* <SubMenu label="Withdraw" icon={<MdOutbox></MdOutbox>}>
          <MenuItem icon={<MdPending></MdPending>} component={<NavLink to="/leery/admin/dashboard/pending-withdraw" />}>Pending</MenuItem>
          <MenuItem icon={<MdApproval></MdApproval>} component={<NavLink to="/leery/admin/dashboard/approved-withdraw" />}>Approved</MenuItem>
          <MenuItem icon={<MdBlock></MdBlock>} component={<NavLink to="/leery/admin/dashboard/rejected-withdraw" />}>Rejected</MenuItem>
        </SubMenu> */}
        {/* <SubMenu label="Job" icon={<MdWork></MdWork>}>
          <MenuItem icon={<MdAdd></MdAdd>} component={<NavLink to="/leery/admin/dashboard/add-job" />}>Add</MenuItem>
          <MenuItem icon={<MdListAlt></MdListAlt>} component={<NavLink to="/leery/admin/dashboard/manage-job" />}>Manage</MenuItem>
          <MenuItem icon={<MdDoneOutline></MdDoneOutline>} component={<NavLink to="/leery/admin/dashboard/user-job-submit" />}>User Submit</MenuItem>
        </SubMenu> */}
        {/* <SubMenu label="Direct Link" icon={<FaDirections></FaDirections>}>
          <MenuItem icon={<MdAdd></MdAdd>} component={<NavLink to="/leery/admin/dashboard/add-direct-link" />}>Add</MenuItem>
          <MenuItem icon={<MdListAlt></MdListAlt>} component={<NavLink to="/leery/admin/dashboard/manage-direct-link" />}>Manage</MenuItem>
          <MenuItem icon={<MdDoneOutline></MdDoneOutline>} component={<NavLink to="/leery/admin/dashboard/user-direct-link-submit" />}>User Submit</MenuItem>
        </SubMenu> */}
        <SubMenu label="Product" icon={<MdViewList></MdViewList>}>
          <MenuItem icon={<MdAdd></MdAdd>} component={<NavLink to="/leery/admin/dashboard/add-product" />}>Add</MenuItem>
          <MenuItem icon={<MdListAlt></MdListAlt>} component={<NavLink to="/leery/admin/dashboard/manage-products" />}>Manage</MenuItem>
        </SubMenu>
        <SubMenu label="Banner" icon={<MdViewList></MdViewList>}>
          <MenuItem icon={<MdAdd></MdAdd>} component={<NavLink to="/leery/admin/dashboard/add-banner" />}>Add</MenuItem>
          <MenuItem icon={<MdListAlt></MdListAlt>} component={<NavLink to="/leery/admin/dashboard/manage-banner" />}>Manage</MenuItem>
        </SubMenu>
        <MenuItem icon={<MdLink></MdLink>} component={<NavLink to="/leery/admin/dashboard/web-setup" />}>Web Setup</MenuItem>
        {/* <MenuItem icon={<MdLocalOffer></MdLocalOffer>} component={<NavLink to="/leery/admin/dashboard/packages" />}>Packages</MenuItem> */}

      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;