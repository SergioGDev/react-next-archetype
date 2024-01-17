import React, { useEffect, useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, FormControl, FormControlLabel, Switch } from '@mui/material';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { ExpansionPanelWithSwitchProps } from './ExpansionPanelWithSwitch.types';

const ExpansionPanelWithSwitch = ({
  children,
  disabled = false,
  defaultEnabled = false,
  handleOnChangeEnableSwitch,
  onMouseEnter,
  switchLabel,
  switchName,
  switchTestSelector,
  accordionTestSelector,
  sx,
}: ExpansionPanelWithSwitchProps) => {
  const [expanded, setExpanded] = useState(false);
  const [enabled, setEnabled] = useState(defaultEnabled);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    !isFirstTime && handleOnChangeEnableSwitch && handleOnChangeEnableSwitch(enabled);
    isFirstTime && setIsFirstTime(false);
  }, [enabled]);

  useEffect(() => {
    setExpanded(defaultEnabled);
    setEnabled(defaultEnabled);
  }, [defaultEnabled]);

  const handleOnMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onMouseEnter && onMouseEnter(event);
  };

  return (
    <Accordion sx={sx} expanded={expanded} onMouseEnter={handleOnMouseEnter} test-selector={accordionTestSelector}>
      <AccordionSummary
        expandIcon={
          enabled === true ? <ExpandMoreOutlined onClick={() => setExpanded((expanded) => !expanded)} /> : undefined
        }
      >
        <FormControl test-selector={switchTestSelector}>
          <FormControlLabel
            name={switchName}
            label={switchLabel}
            sx={{ color: enabled ? 'black' : 'gray' }}
            disabled={disabled}
            control={
              <Switch
                color="secondary"
                value={enabled}
                checked={enabled}
                onChange={() => {
                  setEnabled((enabled) => !enabled);
                  setExpanded(!enabled);
                }}
                test-selector={`${switchTestSelector}-checkbox`}
                aria-checked={enabled}
              />
            }
          />
        </FormControl>
      </AccordionSummary>
      <AccordionDetails>{enabled && children}</AccordionDetails>
    </Accordion>
  );
};

export default ExpansionPanelWithSwitch;
