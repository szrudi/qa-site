import React from "react";
import styled from "styled-components";

const Tooltip = styled.div`
  position: relative;
  touch-action: none; // to fix cancellation of pointermove
  --tooltip-width: max(150px, min(350px, 80vmin));
  --top-pos: calc(1px * var(--mouse-y) + 25px);
  --left-pos: calc(1px * var(--mouse-x));
  --border-color: #656565;

  &::before {
    content: attr(data-tooltip);
    position: absolute;
    top: var(--top-pos);
    left: calc(
      min(
        105% - var(--tooltip-width),
        max(-5%, var(--left-pos) - var(--tooltip-width) / 2)
      )
    );
    z-index: 1;
    display: none;

    /* basic styles */
    width: var(--tooltip-width);
    padding: 1rem;
    border-radius: 10px;
    border: 2px solid var(--border-color);
    background: #f5f5ff;
    text-align: center;
  }

  &::after {
    --arrow-width: 10px;

    content: "";
    position: absolute;
    top: var(--top-pos);
    left: var(--left-pos);
    transform: translate(
      calc(var(--arrow-width) * -1),
      calc(var(--arrow-width) * -2)
    );
    z-index: 1;
    display: none;

    /* the arrow */
    border-width: var(--arrow-width);
    border-style: solid;
    border-color: transparent transparent var(--border-color) transparent;
  }

  &:hover::before,
  &:hover::after {
    display: block;
  }
`;
Tooltip.displayName = "Tooltip";

const withTooltip = (
  Component,
  componentName = Component.displayName ?? Component.name
) => {
  function ComponentWithTooltip({
    tooltip = "",
    componentName,
    children = null,
    ...componentProps
  }) {
    const component = <Component {...componentProps}>{children}</Component>;
    if (tooltip) {
      return (
        <Tooltip data-tooltip={tooltip} onPointerMove={handlePointerMove}>
          {component}
        </Tooltip>
      );
    } else {
      return component;
    }
  }

  ComponentWithTooltip.displayName = `withTooltip(${componentName})`;

  return ComponentWithTooltip;
};

export default withTooltip;

function handlePointerMove(e) {
  // TODO Needs better handling for touch actions.
  if (!e.isPrimary) return;

  const trackedElement = e.currentTarget;
  const zoomRect = trackedElement.getBoundingClientRect();
  trackedElement.style.setProperty(
    "--mouse-x",
    (e.clientX - zoomRect.x).toString()
  );
  trackedElement.style.setProperty(
    "--mouse-y",
    (e.clientY - zoomRect.y).toString()
  );
}
