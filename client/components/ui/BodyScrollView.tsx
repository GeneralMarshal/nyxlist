import { ScrollView, ScrollViewProps } from "react-native";
import { forwardRef } from "react";

export const BodyScrollView = forwardRef<ScrollView, ScrollViewProps>(
  (props, ref) => {
    return (
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentInsetAdjustmentBehavior="automatic"
        contentInset={{ bottom: 0 }}
        scrollIndicatorInsets={{ bottom: 0 }}
        {...props}
        ref={ref}
      />
    );
  }
);
BodyScrollView.displayName = "BodyScrollView";
