export default {
  grid: {
    left: "0%",
    right: "0%",
    top: "0%",
    bottom: "0%"
  },
  series: [
    {
      name: "Funnel",
      type: "funnel",
      left: "10%",
      top: 20,
      bottom: 10,
      width: "80%",
      min: 0,
      max: 100,
      minSize: "0%",
      maxSize: "100%",
      sort: "descending",
      gap: 2,
      label: {
        show: true,
        position: "inside"
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: "solid"
        }
      },
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: [
        { value: 60, name: "Visit" },
        { value: 40, name: "Inquiry" },
        { value: 20, name: "Order" },
        { value: 80, name: "Click" },
        { value: 100, name: "Show" }
      ]
    }
  ]
};
