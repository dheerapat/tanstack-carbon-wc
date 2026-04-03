import { useEffect, useRef } from "react";
import "@carbon/web-components/es/components/ui-shell/index.js";

export function Navbar() {
  const headerNameRef = useRef<HTMLElement>(null);

  useEffect(() => {
    headerNameRef.current?.setAttribute("prefix", "Auto Medica Labs. - ");
  }, []);
  return (
    <cds-header aria-label="Project Nutrix">
      <cds-header-name ref={headerNameRef} href="/">
        Nutrix
      </cds-header-name>
      <cds-header-nav menu-bar-label="IBM [Platform]">
        <cds-header-nav-item href="/appointment">
          Appointment
        </cds-header-nav-item>
        <cds-header-nav-item href="javascript:void 0">
          Patient
        </cds-header-nav-item>
      </cds-header-nav>
    </cds-header>
  );
}
