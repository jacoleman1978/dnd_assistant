import {Outlet, Link as RouterLink} from 'react-router-dom';

function NavTabs() {
  return (
    <div>
      <nav className="row-wrap-center-center">
        <ul className="row-wrap-center-center sm-margin-top">
          <li className="sm-margin-right">
            <RouterLink to="/dnd_assistant">Home</RouterLink>
          </li>
          <li className="sm-margin-left sm-margin-right">
            <RouterLink to="/dnd_assistant/find-magic-items">Find Magic Items</RouterLink>
          </li>
          <li className="sm-margin-left sm-margin-right">
            <RouterLink to="/dnd_assistant/crit-hits-and-misses">Criticals</RouterLink>
          </li>
          <li className="sm-margin-left sm-margin-right">
            <RouterLink to="/dnd_assistant/group-rolls">Group Rolls</RouterLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavTabs;