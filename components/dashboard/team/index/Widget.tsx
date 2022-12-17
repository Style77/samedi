import React, { forwardRef, Suspense, useState } from 'react';
import { Layout } from 'react-grid-layout';
import { availableWidgets } from './widgets/WidgetSelector';

const AVAILABLE_WIDGETS = availableWidgets.map((widget) => widget.id);

type IWidget = {
  id: string;
  layout: Layout;
};


const loadWidget = (widget: IWidget) => {
  // Due to StackBlitz limitaion, I was not able to make it work dynamically
  // But this switch case can be easily replaced with following dynamic code
  // return React.lazy(() => import(`../widget/${widget.id}.tsx`));
  // switch (widget.id) {
  //   case "IncrementWidget":
  //     return () => import(`./widgets/HelloWidget`);
  //   case "DecrementWidget":
  //     return () => import(`../widgets/DecrementWidget.tsx`);
  //   case "ImageWidget":
  //     return () => import(`../widgets/ImageWidget.tsx`);
  //   default:
  //     return null;
  // }

  if (AVAILABLE_WIDGETS.includes(widget.id)) {
    return React.lazy(() => import(`./widgets/${widget.id}`))
  } else {
    return React.lazy(() => import(`./widgets/DefaultWidget`))
  }

};

type Props = {
  widget: IWidget;
  children?: React.ReactNode;
};

const Widget = forwardRef((props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { widget } = props;
  const [ WidgetComponent ] = useState(() => loadWidget(widget));

  return (
    <div ref={ref} {...props}>
      <Suspense fallback={<>Loading</>}>
        <WidgetComponent />
        {props.children}
      </Suspense>
    </div>
  );
});

Widget.displayName = "Widget";

export default Widget;