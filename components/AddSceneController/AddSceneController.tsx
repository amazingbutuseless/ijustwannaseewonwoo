import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormHelperText,
  Input,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { PreferenceContext } from 'contexts/PreferenceContext';

import * as Styled from './style';

interface Props {
  hasRegisteredScene: boolean;
  onPlayButtonClick: (startTime: number, endTime: number) => void;
  getCurrentTimeFromPlayer: () => number | null;
  onAddSceneButtonClick: (startTime: number, endTime: number, callback: VoidFunction) => void;
}

function checkIfValidScene(start: unknown, end: unknown) {
  if (typeof start !== 'number' || typeof end !== 'number') {
    return false;
  }
  return start > 0 && end > start;
}

export default function AddSceneController({
  hasRegisteredScene,
  onPlayButtonClick,
  getCurrentTimeFromPlayer,
  onAddSceneButtonClick,
}: Props) {
  const preference = useContext(PreferenceContext);

  const { t } = useTranslation('video');

  const startMinutes = useRef<HTMLInputElement>();
  const startSeconds = useRef<HTMLInputElement>();
  const endMinutes = useRef<HTMLInputElement>();
  const endSeconds = useRef<HTMLInputElement>();

  const [start, setStart] = useState<number>();
  const [end, setEnd] = useState<number>();

  const handlePlayButtonClick = useCallback(() => {
    if (start && end) {
      onPlayButtonClick(start, end);
    }
  }, [start, end]);

  const convertToSeconds = useCallback(
    (type: 'start' | 'end') => {
      const minutes = (type === 'start' ? startMinutes : endMinutes).current;
      const seconds = (type === 'start' ? startSeconds : endSeconds).current;
      if (!minutes || !seconds) return;
      return parseInt(minutes.value || '0', 10) * 60 + parseInt(seconds.value || '0', 10);
    },
    [startMinutes, startSeconds, endMinutes, endSeconds]
  );

  const onStartTimeChange = useCallback(() => {
    setStart(convertToSeconds('start'));
  }, []);

  const onEndTimeChange = useCallback(() => {
    setEnd(convertToSeconds('end'));
  }, []);

  const onShortCutKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!['s', 'e'].includes(e.key)) return;
      if (!startMinutes.current || !startSeconds.current || !endMinutes.current || !endSeconds.current) return;

      const currentTime = getCurrentTimeFromPlayer();
      if (currentTime === null) return;

      const currentMinutes = Math.floor(currentTime / 60);
      const currentSeconds = Math.floor(currentTime % 60);

      if (e.key === 's') {
        startMinutes.current.value = currentMinutes.toString();
        startSeconds.current.value = currentSeconds.toString();
        onStartTimeChange();
        return;
      }

      endMinutes.current.value = currentMinutes.toString();
      endSeconds.current.value = currentSeconds.toString();
      onEndTimeChange();
    },
    [startMinutes, startSeconds, endMinutes, endSeconds, getCurrentTimeFromPlayer]
  );

  useEffect(() => {
    window.addEventListener('keydown', onShortCutKeyDown);

    return () => {
      window.removeEventListener('keydown', onShortCutKeyDown);
    };
  }, []);

  const handleShowAddScenePanelChange = useCallback((_, expanded: boolean) => {
    preference.setAddScenePanelToBeExpanded(expanded);
  }, []);

  const reset = useCallback(() => {
    if (startMinutes.current) startMinutes.current.value = '';
    if (startSeconds.current) startSeconds.current.value = '';
    if (endMinutes.current) endMinutes.current.value = '';
    if (endSeconds.current) endSeconds.current.value = '';
    setStart(undefined);
    setEnd(undefined);
  }, []);

  const handleAddSceneButtonClick = useCallback(() => {
    if (typeof start !== 'number' || typeof end !== 'number') return;
    onAddSceneButtonClick(start, end, reset);
  }, [start, end]);

  const isValidScene = useMemo(() => checkIfValidScene(start, end), [start, end]);

  return (
    <Styled.Wrapper
      expanded={!hasRegisteredScene || preference.expandAddScenePanel}
      onChange={handleShowAddScenePanelChange}
      elevation={0}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <HelpOutlineIcon />{' '}
        <Typography variant="body2" sx={{ marginLeft: '0.8rem' }}>
          {t('scene.addScene.title')}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography variant="body2" color="var(--silver-chalice)">
          {t('scene.addScene.description')}
        </Typography>
        <Styled.Controller>
          <Styled.Fieldset>
            <legend>{t('scene.startTime')}</legend>
            <FormControl>
              <Input
                type="number"
                endAdornment={<>:</>}
                inputProps={{ min: 0, 'aria-label': 'start minutes' }}
                placeholder="00"
                onChange={onStartTimeChange}
                inputRef={startMinutes}
              />
              <FormHelperText sx={{ fontSize: '1.2rem' }}>{t('scene.minutes')}</FormHelperText>
            </FormControl>
            <FormControl>
              <Input
                type="number"
                inputProps={{ min: 0, max: 59, 'aria-label': 'start seconds' }}
                placeholder="00"
                onChange={onStartTimeChange}
                inputRef={startSeconds}
              />
              <FormHelperText sx={{ fontSize: '1.2rem' }}>{t('scene.seconds')}</FormHelperText>
            </FormControl>
          </Styled.Fieldset>
          <Styled.Fieldset>
            <legend>{t('scene.endTime')}</legend>
            <FormControl>
              <Input
                type="number"
                endAdornment={<>:</>}
                inputProps={{ min: 0, 'aria-label': 'end minutes' }}
                placeholder="00"
                onChange={onEndTimeChange}
                inputRef={endMinutes}
              />
              <FormHelperText sx={{ fontSize: '1.2rem' }}>{t('scene.minutes')}</FormHelperText>
            </FormControl>
            <FormControl>
              <Input
                type="number"
                inputProps={{ min: 0, max: 59, 'aria-label': 'end seconds' }}
                placeholder="00"
                onChange={onEndTimeChange}
                inputRef={endSeconds}
              />
              <FormHelperText sx={{ fontSize: '1.2rem' }}>{t('scene.seconds')}</FormHelperText>
            </FormControl>
          </Styled.Fieldset>
        </Styled.Controller>

        <Styled.ButtonContainer>
          <Button
            variant="outlined"
            startIcon={<PlayCircleOutlineIcon fontSize="large" />}
            onClick={handlePlayButtonClick}
            disabled={!isValidScene}
          >
            Preview
          </Button>
          <Button
            variant="outlined"
            startIcon={<PlaylistAddIcon fontSize="large" />}
            onClick={handleAddSceneButtonClick}
            disabled={!isValidScene}
          >
            Add Scene
          </Button>
        </Styled.ButtonContainer>
      </AccordionDetails>
    </Styled.Wrapper>
  );
}
