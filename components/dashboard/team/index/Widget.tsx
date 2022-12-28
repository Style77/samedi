import { Skeleton } from '@mui/material';
import React, { forwardRef, Suspense, useState } from 'react';
import { Layout } from 'react-grid-layout';
import { availableWidgets } from './widgets/WidgetSelector';

const AVAILABLE_WIDGETS = availableWidgets.map((widget) => widget.id);

type IWidget = {
  id: string;
  layout: Layout;
};


const loadWidget = (widget: IWidget) => {

  console.log(widget)
  const widget_id = widget.id.split("__")[0];
  console.log(widget_id)
  if (AVAILABLE_WIDGETS.includes(widget_id)) {
    return React.lazy(() => import(`./widgets/${widget_id}`));
  } else {
    return React.lazy(() => import(`./widgets/DefaultWidget`));
  }

};

type Props = {
  widget: IWidget;
  children?: React.ReactNode;
};

const SkeletonWidget = () => {
  return (<Skeleton variant="rounded" width={220} height={100} sx={{ backgroundColor: "grey.100" }} />);
};

const Widget = forwardRef((props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { widget } = props;
  const [ WidgetComponent ] = useState(() => loadWidget(widget));

  return (
    <div ref={ref} {...props}>
      <Suspense fallback={<SkeletonWidget />}>
        <WidgetComponent />
        {props.children}
      </Suspense>
    </div>
  );
});

Widget.displayName = "Widget";

export default Widget;