// icon:car-front-fill | Bootstrap https://icons.getbootstrap.com/ | Bootstrap
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconCarFrontFill(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      {...props}
    >
      <Path
        fillRule="evenodd"
        d="M2.52 3.515A2.5 2.5 0 014.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 01.049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 00.381-.404l.792-1.848zM3 10a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2zM6 8a1 1 0 000 2h4a1 1 0 100-2H6zM2.906 5.189l.956-1.913A.5.5 0 014.309 3h7.382a.5.5 0 01.447.276l.956 1.913a.51.51 0 01-.497.731c-.91-.073-3.35-.17-4.597-.17-1.247 0-3.688.097-4.597.17a.51.51 0 01-.497-.731z"/>
    </Svg>
  );
}

export default IconCarFrontFill;
