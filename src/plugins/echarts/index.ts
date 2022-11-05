import * as echarts from "echarts/core";
import {
  PieChart,
  BarChart,
  LineChart,
  GraphChart,
  RadarChart,
  FunnelChart,
  MapChart
} from "echarts/charts";

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent
} from "echarts/components";

import { SVGRenderer } from "echarts/renderers";
const { use } = echarts;

use([
  MapChart,
  FunnelChart,
  RadarChart,
  PieChart,
  BarChart,
  LineChart,
  GraphChart,
  SVGRenderer,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent
]);
// 按需加载
export default echarts;
