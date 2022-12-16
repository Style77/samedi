import { Query } from "appwrite";
import { useEffect, useRef, useState } from "react";

import { Responsive } from "react-grid-layout";
import { WidthProvider } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

import { appwrite } from "../../../../store/appwrite";

type Props = {
  teamId: string;
  isEditable: boolean;
  setIsEditable: any;
  layouts: { lg: Tile[] };
  setLayouts: any;
};

export type Tile = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const defaultCols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

const GridLayout = (props: Props) => {
  const [lastLayoutsThatRespectMaxHeight, setLastLayoutsThatRespectMaxHeight] = useState<{lg: Tile[]}>({lg: []});

  const [breakpoint, setBreakpoint] = useState("lg");

  const generateDOM = () => {
    console.log(props.layouts);
    return props.layouts.lg.map(function (l, i) {
      return (
        <div
          key={i}
          className="bg-gray-200 rounded-lg p-2 border-2 border-zinc-700"
          style={{ height: "15px !important" }}
        >
          <span className="text">{i}</span>
        </div>
      );
    });
  };

  const onLayoutChange = (layout: Tile[], allLayouts: {lg: Tile[]}) => {
    if (layout !== props.layouts.lg) {
      props.setLayouts({lg: layout});
    };
  };

  return (
    <div>
      {props.layouts.lg ? (
        <ResponsiveReactGridLayout
          layouts={props.layouts}
          onLayoutChange={onLayoutChange}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={defaultCols}
          measureBeforeMount={false}
          useCSSTransforms={true}
          compactType={null}
          preventCollision={false}
          isDraggable={props.isEditable}
        >
          {generateDOM()}
        </ResponsiveReactGridLayout>
      ) : null}
    </div>
  );
};

export default GridLayout;
