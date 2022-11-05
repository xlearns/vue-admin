import { defineComponent } from "vue";
export default defineComponent({
  props: {
    row: [String, Number],
    column: [String, Number],
    render: Function
  },
  setup(props) {
    const params = {
      row: props.row,
      column: props.column
    };
    return { params, renderFn: props.render };
  },
  render() {
    const { renderFn, params } = this;
    return renderFn(params);
  }
});
