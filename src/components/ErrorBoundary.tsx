import React, { ErrorInfo, ReactNode, ReactPropTypes } from "react";
import { FullPageWraper } from "@/components/Loading";
interface errorBoundaryProps {
  children?: ReactNode;
}
type FallBackRender = (props: { error: Error | null }) => React.ReactElement;
export class ErrorBoundary extends React.Component<
  errorBoundaryProps,
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };
  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 你同样可以将错误日志上报给服务器
  }

  render() {
    if (this.state.error) {
      // 你可以自定义降级后的 UI 并渲染
      return <FullPageWraper>{this.state.error?.message}</FullPageWraper>;
    }
    return this.props.children;
  }
}
