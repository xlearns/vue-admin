export default {
  series: [
    {
      name: "Nightingale Chart",
      type: "pie",
      radius: ["20%", "95%"],
      center: ["50%", "50%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 8
      },
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 40, name: "rose 1" },
        { value: 38, name: "rose 2" },
        { value: 32, name: "rose 3" },
        { value: 30, name: "rose 4" },
        { value: 28, name: "rose 5" },
        { value: 26, name: "rose 6" },
        { value: 22, name: "rose 7" },
        { value: 18, name: "rose 8" }
      ]
    }
  ]
};
