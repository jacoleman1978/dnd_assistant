import {Outlet, Link as RouterLink} from 'react-router-dom';

/**
 * 
 * @returns A navigation bar with links to the Criticals, Find Magic Items, Group Rolls, and Stat Set pages.
 */
function NavTabs() {
  return (
    <nav className="sm-margin-bottom">
      <div className="row-wrap-center-center">
        <ul className="row-wrap-center-center sm-margin-top">
          <li className="sm-margin-right">
            <RouterLink to="/dnd_assistant">Criticals</RouterLink>
          </li>
          <li className="sm-margin-left sm-margin-right">
            <RouterLink to="/dnd_assistant/find-magic-items">Find Magic Items</RouterLink>
          </li>
          <li className="sm-margin-left sm-margin-right">
            <RouterLink to="/dnd_assistant/group-rolls">Group Rolls</RouterLink>
          </li>
          <li className="sm-margin-left">
            <RouterLink to="/dnd_assistant/stat-set">Stat Set</RouterLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </nav>
  );
}

export default NavTabs;