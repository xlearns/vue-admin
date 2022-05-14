export type Component = () => Promise<typeof import("*.vue")>;

export interface AppRouteModule {
  path: string;
  name?: string;
  component?: string | Component;
  redirect?: string;
  children?: AppRouteModule[];
  meta: {
    title: string;
    icon?: string;
    hidden?: boolean;
    roles?: string[];
    keepAlive?: boolean;
  };
}
