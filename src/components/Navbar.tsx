import { useEffect, useRef } from "react";
import "@carbon/web-components/es/components/ui-shell/index.js";
import { User } from "@carbon/icons-react";

export function Navbar() {
  const headerNameRef = useRef<HTMLElement>(null);

  useEffect(() => {
    headerNameRef.current?.setAttribute("prefix", "Auto Medica Labs. - ");
  }, []);

  return (
    <>
      <cds-header aria-label="Project Nutrix">
        <cds-header-menu-button aria-label="Open menu"></cds-header-menu-button>
        <cds-header-name ref={headerNameRef} href="/">
          Nutrix
        </cds-header-name>
        <cds-header-nav menu-bar-label="Nutrix">
          <cds-header-nav-item href="/appointment">
            Appointment
          </cds-header-nav-item>
          <cds-header-nav-item href="javascript:void 0">
            Patient
          </cds-header-nav-item>
        </cds-header-nav>
        <div className="navbar-user-meta" aria-label="Signed in user">
          <div className="navbar-user-text">
            <span className="navbar-user-name">John Doe</span>
            <span className="navbar-user-id">EMP-00123</span>
          </div>
          <User className="navbar-user-icon" aria-hidden="true" size={20} />
        </div>
      </cds-header>

      <cds-side-nav aria-label="Side navigation" is-not-persistent="true">
        <cds-header-side-nav-items>
          <cds-side-nav-link href="/appointment">Appointment</cds-side-nav-link>
          <cds-side-nav-link href="javascript:void 0">
            Patient
          </cds-side-nav-link>
        </cds-header-side-nav-items>
      </cds-side-nav>
    </>
  );
}
