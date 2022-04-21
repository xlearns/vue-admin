import * as echarts from "echarts/core";
import { PieChart, BarChart, LineChart, GraphChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";
import {
  GridComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  VisualMapComponent
} from "echarts/components";
const { use } = echarts;

use([
  PieChart,
  BarChart,
  LineChart,
  GraphChart,
  SVGRenderer,
  GridComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  VisualMapComponent
]);
// 按需加载
export default echarts;
