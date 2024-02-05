import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export function parseInlineStyles(styles: string | undefined): Record<string, string> {
  const stylePairs = styles?.split(';') ?? [];
  const styleObject: Record<string, string> = {};
  stylePairs.forEach((pair) => {
    const [key, value] = pair.split(':');
    if (key && value) {
      styleObject[key.trim()] = value.trim();
    }
  });

  return styleObject;
}

export const Default = (props: ComponentProps): JSX.Element => {
  let enabledColumns = Number.parseInt(props.params.EnabledColumns);
  if (isNaN(enabledColumns) || enabledColumns < 1) {
    enabledColumns = 1;
  }
  const enabledColIndexes = [...Array(enabledColumns).keys()];

  const columnSizes = enabledColIndexes.map((i) => props.params[`ColumnSize${i + 1}`]);

  const columnStyles = enabledColIndexes.map((i) => props.params[`ColumnStyle${i + 1}`]);

  const containerStyles = parseInlineStyles(props.params.ContainerStyles);
  if (!containerStyles.width) {
    containerStyles.width = '100%';
  }

  if (enabledColumns === 1 && !columnSizes[0]) {
    columnSizes[0] = 'basis-full';
  }

  const id = props.params.RenderingIdentifier;

  return (
    <div style={{ width: '100%' }} className="layout-container-wrapper">
      <div style={containerStyles} className="layout-container" id={id ? id : undefined}>
        {enabledColIndexes.map((index) => {
          const phKey = `layout-column-${index + 1}-{*}`;
          const columnClass = columnSizes[index] ?? '';
          const columnStyle = columnStyles[index] ?? '';

          return (
            <div key={index + 1} className={`${columnClass} layout-column`}>
              <div key={index + 1} className={`layout-column-content ${columnStyle}`}>
                <Placeholder key={index} name={phKey} rendering={props.rendering} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
