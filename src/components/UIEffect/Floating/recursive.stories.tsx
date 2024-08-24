import type { Meta, StoryObj } from "@storybook/react/*";

import { RecursiveFloatingContainer } from ".";

const meta = {
  component: RecursiveFloatingContainer,
  args: {
    floating: "floating",
    initial: "hidden",
    floatMode: "animationstart",
  },
} satisfies Meta<typeof RecursiveFloatingContainer>;

type Story = StoryObj<typeof meta>;

export default meta;

export const RecursiveH1 = {
  args: {
    children: (
      <>
        <h1>테스트🎉</h1>
        <h2>테스트🎉</h2>
        <h3>테스트🎉</h3>
        <h4>테스트🎉</h4>
        <h5>테스트🎉</h5>
      </>
    ),
  },
} satisfies Story;
