import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { useState, useCallback } from 'react';

function App() {
  const [hotTempStr, setHotTempStr] = useState('');
  const hotTemp = Number.isNaN(parseInt(hotTempStr, 10))
    ? -1
    : parseInt(hotTempStr, 10);
  const [coldTempStr, setColdTempStr] = useState('');
  const coldTemp = Number.isNaN(parseInt(coldTempStr, 10))
    ? -1
    : parseInt(coldTempStr, 10);
  const [totalVolumeStr, setTotalVolumeStr] = useState('');
  const totalVolume = Number.isNaN(parseInt(totalVolumeStr, 10))
    ? -1
    : parseInt(totalVolumeStr, 10);

  const onHotTempChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setHotTempStr(event.target.value);
    },
    [],
  );
  const onColdTempChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setColdTempStr(event.target.value);
    },
    [],
  );
  const onTotalVolumeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTotalVolumeStr(event.target.value);
    },
    [],
  );

  const canCalculate = hotTemp >= 0 && coldTemp >= 0 && totalVolume >= 0;
  const [showResult, setShowResult] = useState(false);
  const [secondColdWaterVolume, setSecondColdWaterVolume] = useState('');
  const [firstColdWaterVolume, setFirstColdWaterVolume] = useState('');
  const [hotWaterVolume, setHotWaterVolume] = useState('');
  const onCalculate = useCallback(() => {
    if (!canCalculate) {
      return;
    }
    const newSecondColdWaterVolume = (totalVolume * 30) / (70 - coldTemp);
    const newFirstColdWaterVolume =
      (totalVolume * (40 - (30 / (70 - coldTemp)) * coldTemp)) /
      (coldTemp + (hotTemp * (70 - coldTemp)) / (hotTemp - 70));
    const newHotWaterVolume =
      totalVolume - newSecondColdWaterVolume - newFirstColdWaterVolume;
    setSecondColdWaterVolume(newSecondColdWaterVolume.toFixed(2));
    setFirstColdWaterVolume(newFirstColdWaterVolume.toFixed(2));
    setHotWaterVolume(newHotWaterVolume.toFixed(2));
    setShowResult(true);
  }, [canCalculate, hotTemp, coldTemp, totalVolume]);

  const onHotWaterVolumeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setHotWaterVolume(event.target.value);
    },
    [],
  );
  const onFirstColdWaterVolumeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFirstColdWaterVolume(event.target.value);
    },
    [],
  );
  const onSecondColdWaterVolumeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSecondColdWaterVolume(event.target.value);
    },
    [],
  );

  return (
    <>
      <CssBaseline />
      <Stack spacing={2} margin={2}>
        <Box>
          <Typography variant="body1">Water Mix Calculator</Typography>
        </Box>
        <TextField
          label="Hot Temp (°C)"
          value={hotTempStr}
          onChange={onHotTempChange}
        />
        <TextField
          label="Cold Temp (°C)"
          value={coldTempStr}
          onChange={onColdTempChange}
        />
        <TextField
          label="Total Volume (c.c.)"
          value={totalVolumeStr}
          onChange={onTotalVolumeChange}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!canCalculate}
          onClick={onCalculate}
        >
          Calculate Mix
        </Button>
        <Divider />
        {showResult ? (
          <>
            <TextField
              label="Hot Water (c.c.)"
              value={hotWaterVolume}
              onChange={onHotWaterVolumeChange}
            />
            <TextField
              label="Cold Water 1 (c.c.)"
              value={firstColdWaterVolume}
              onChange={onFirstColdWaterVolumeChange}
            />
            <TextField
              label="Cold Water 2 (c.c.)"
              value={secondColdWaterVolume}
              onChange={onSecondColdWaterVolumeChange}
            />
            <Grid container spacing={2}>
              <Grid size={6}>
                <Card>
                  <CardContent>
                    <Typography>1st Mix Temp</Typography>
                    <Typography>
                      {(
                        (Number(hotWaterVolume) * hotTemp +
                          Number(firstColdWaterVolume) * coldTemp) /
                        (Number(hotWaterVolume) + Number(firstColdWaterVolume))
                      ).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={6}>
                <Card>
                  <CardContent>
                    <Typography>2nd Mix Temp</Typography>
                    <Typography>
                      {(
                        (Number(hotWaterVolume) * hotTemp +
                          Number(firstColdWaterVolume) * coldTemp +
                          Number(secondColdWaterVolume) * coldTemp) /
                        (Number(hotWaterVolume) +
                          Number(firstColdWaterVolume) +
                          Number(secondColdWaterVolume))
                      ).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={12}>
                <Card>
                  <CardContent>
                    <Typography>Total Volume</Typography>
                    <Typography>
                      {Number(hotWaterVolume) +
                        Number(firstColdWaterVolume) +
                        Number(secondColdWaterVolume)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Stack>
    </>
  );
}

export default App;
