import { css } from "@emotion/css";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { ThemeProvider } from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import ErrorIcon from "@material-ui/icons/Error";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SaveIcon from "@material-ui/icons/Save";
import SortIcon from "@material-ui/icons/Sort";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Prompt } from "react-router";
import { useCharacters } from "../../contexts/CharactersContext/CharactersContext";
import {
  DefaultDiceCommandOptionList,
  DiceContext,
} from "../../contexts/DiceContext/DiceContext";
import { useLogger } from "../../contexts/InjectionsContext/hooks/useLogger";
import {
  ISavableScene,
  useScenes,
} from "../../contexts/SceneContext/ScenesContext";
import { arraySort } from "../../domains/array/arraySort";
import { ICharacter } from "../../domains/character/types";
import {
  IDiceCommandOption,
  IDiceRollResult,
  RollType,
} from "../../domains/dice/Dice";
import { Font } from "../../domains/font/Font";
import { useBlockReload } from "../../hooks/useBlockReload/useBlockReload";
import { useDicePool } from "../../hooks/useDicePool/useDicePool";
import { useLightBackground } from "../../hooks/useLightBackground/useLightBackground";
import { usePeerConnections } from "../../hooks/usePeerJS/usePeerConnections";
import { AspectType } from "../../hooks/useScene/AspectType";
import { useScene } from "../../hooks/useScene/useScene";
import { useTextColors } from "../../hooks/useTextColors/useTextColors";
import { useThemeFromColor } from "../../hooks/useThemeFromColor/useThemeFromColor";
import { useTranslate } from "../../hooks/useTranslate/useTranslate";
import { CharacterV3Dialog } from "../../routes/Character/components/CharacterDialog/CharacterV3Dialog";
import { IPeerActions } from "../../routes/Play/types/IPeerActions";
import { ContentEditable } from "../ContentEditable/ContentEditable";
import { DiceFab, DiceFabMode } from "../DiceFab/DiceFab";
import { DrawArea } from "../DrawArea/DrawArea";
import { FateLabel } from "../FateLabel/FateLabel";
import { IndexCard } from "../IndexCard/IndexCard";
import { ManagerMode } from "../Manager/Manager";
import { LiveMode, Page } from "../Page/Page";
import { CharacterCard } from "./components/PlayerRow/CharacterCard/CharacterCard";
import { PlayerRow } from "./components/PlayerRow/PlayerRow";

export enum SceneMode {
  PlayOnline,
  PlayOffline,
  Manage,
}

export const paperStyle = css({ borderRadius: "0px", flex: "1 0 auto" });

type IProps =
  | {
      mode: SceneMode.Manage;
      sceneManager: ReturnType<typeof useScene>;
      scenesManager: ReturnType<typeof useScenes>;
      charactersManager: ReturnType<typeof useCharacters>;
      connectionsManager?: undefined;
      idFromParams?: undefined;
      isLoading?: undefined;
      error?: undefined;
    }
  | {
      mode: SceneMode.PlayOnline;
      sceneManager: ReturnType<typeof useScene>;
      scenesManager: ReturnType<typeof useScenes>;
      charactersManager: ReturnType<typeof useCharacters>;
      connectionsManager: ReturnType<typeof usePeerConnections>;
      userId: string;
      isLoading: boolean;
      error: any;
      shareLink: string;
      idFromParams?: string;
    }
  | {
      mode: SceneMode.PlayOffline;
      sceneManager: ReturnType<typeof useScene>;
      scenesManager: ReturnType<typeof useScenes>;
      charactersManager: ReturnType<typeof useCharacters>;
      connectionsManager?: undefined;
      idFromParams?: undefined;
      isLoading?: undefined;
      error?: undefined;
    };

export const Scene: React.FC<IProps> = (props) => {
  const {
    sceneManager,
    connectionsManager,
    scenesManager,
    charactersManager: charactersManager,
  } = props;

  const theme = useTheme();
  const logger = useLogger();
  const diceManager = useContext(DiceContext);

  const isXlAndUp = useMediaQuery(theme.breakpoints.up("xl"));
  const isLgAndUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isMDAndUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSMAndDown = useMediaQuery(theme.breakpoints.down("sm"));
  const errorTheme = useThemeFromColor(theme.palette.error.main);
  const textColors = useTextColors(theme.palette.primary.main);
  const { t } = useTranslate();
  const [menuOpen, setMenuOpen] = useState(false);
  const $menu = useRef(null);

  const $shareLinkInputRef = useRef<HTMLInputElement | null>(null);
  const [shareLinkToolTip, setShareLinkToolTip] = useState({ open: false });

  const [characterDialogPlayerId, setCharacterDialogPlayerId] = useState<
    string | undefined
  >(undefined);

  const [tab, setTab] = useState<
    "player-characters" | "public" | "private" | "zones" | "gm-notes"
  >("public");
  const [savedSnack, setSavedSnack] = useState(false);

  const isGM = !props.idFromParams;
  const isManaging = isGM || props.mode === SceneMode.Manage;

  const poolManager = useDicePool();
  const isPrivate = tab === "private";
  const lightBackground = useLightBackground();
  const isGMHostingOnlineOrOfflineGame =
    props.mode !== SceneMode.Manage && isGM;
  const isGMEditingDirtyScene =
    props.mode === SceneMode.Manage && sceneManager.state.dirty;

  const shouldBlockLeaving =
    isGMHostingOnlineOrOfflineGame || isGMEditingDirtyScene;

  const numberOfColumnsForCards = isXlAndUp
    ? 4
    : isLgAndUp
    ? 3
    : isMDAndUp
    ? 2
    : 1;

  useBlockReload(shouldBlockLeaving);
  useEffect(() => {
    if (shareLinkToolTip.open) {
      const id = setTimeout(() => {
        setShareLinkToolTip({ open: false });
      }, 1000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [shareLinkToolTip]);

  //#region TODO: refac into another function
  const userId = props.mode === SceneMode.PlayOnline ? props.userId : undefined;
  const gm = sceneManager.state.scene.gm;
  const players = sceneManager.state.scene.players;

  const sortedPlayers = arraySort(players, [
    (p) => {
      return {
        value: userId === p.id,
        direction: "asc",
      };
    },
  ]);

  const everyone = [gm, ...sortedPlayers];
  const controllablePlayerIds = everyone
    .filter((player) => {
      if (isGM) {
        return true;
      }
      return userId === player.id;
    })
    .map((p) => p.id);

  const me = everyone.find((player) => {
    if (isGM) {
      return player.isGM;
    }
    return userId === player.id;
  });
  //#endregion

  const liveMode = getLiveMode();

  const handleLoadScene = (newScene: ISavableScene) => {
    sceneManager.actions.loadScene(newScene, true);
  };

  const handleCloneAndLoadScene = (newScene: ISavableScene) => {
    sceneManager.actions.cloneAndLoadNewScene(newScene);
  };

  const handleGMAddOfflinePlayer = () => {
    sceneManager.actions.addOfflinePlayer();
  };

  const handleLoadCharacterForPlayer = (
    playerId: string,
    character: ICharacter
  ) => {
    if (isGM) {
      sceneManager.actions.loadPlayerCharacter(playerId, character);
    } else {
      connectionsManager?.actions.sendToHost<IPeerActions>({
        action: "load-character",
        payload: character,
      });
    }
  };

  const handleOnToggleCharacterSync = (character: ICharacter | undefined) => {
    charactersManager.actions.upsert(character);
  };

  const handleSetRoll = (result: IDiceRollResult) => {
    if (isGM) {
      sceneManager.actions.updateGmRoll(result);
    } else {
      connectionsManager?.actions.sendToHost<IPeerActions>({
        action: "roll",
        payload: result,
      });
    }
  };

  const handleSetPlayerRoll = (playerId: string, result: IDiceRollResult) => {
    if (isGM) {
      sceneManager.actions.updatePlayerRoll(playerId, result);
    } else {
      connectionsManager?.actions.sendToHost<IPeerActions>({
        action: "roll",
        payload: result,
      });
    }
  };

  return (
    <Page
      gameId={props.idFromParams}
      live={liveMode}
      liveLabel={sceneManager.state.scene.name}
    >
      <Box px="1rem">
        <Prompt
          when={shouldBlockLeaving}
          message={t("manager.leave-without-saving")}
        />
        <Snackbar
          open={savedSnack}
          autoHideDuration={2000}
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setSavedSnack(false);
          }}
        >
          <Alert
            severity="success"
            onClose={() => {
              setSavedSnack(false);
            }}
          >
            {t("play-route.scene-saved")}
          </Alert>
        </Snackbar>
        {props.mode !== SceneMode.Manage && (
          <DiceFab
            type={DiceFabMode.RollAndPool}
            onRollPool={() => {
              const result = poolManager.actions.getPoolResult();
              handleSetRoll(result);
            }}
            onClearPool={() => {
              const result = poolManager.actions.clearPool();
            }}
            pool={poolManager.state.pool}
            rollsForDiceBox={me?.rolls ?? []}
            onSelect={(result) => {
              handleSetRoll(result);
            }}
          />
        )}
        {props.error ? renderPageError() : renderPage()}
      </Box>
    </Page>
  );

  function renderPage() {
    if (props.isLoading) {
      return renderIsLoading();
    }
    return renderPageContent();
  }

  function renderIsLoading() {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  function renderPageContent() {
    return (
      <Fade in>
        <Box>
          {props.mode === SceneMode.Manage ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {renderHeader()}
                {renderContent()}
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={5} lg={3}>
                {renderSidePanel()}
              </Grid>
              <Grid item xs={12} md={7} lg={9}>
                {renderHeader()}
                {renderContent()}
              </Grid>
            </Grid>
          )}
        </Box>
      </Fade>
    );
  }

  function renderSidePanel() {
    return (
      <Box display="flex" flexDirection="column" height="100%">
        <Box
          className={css({
            backgroundColor: theme.palette.primary.main,
            color: textColors.primary,
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            minHeight: "4rem",
            padding: ".5rem",
          })}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid
              item
              className={css({
                flex: "1 0 auto",
              })}
            >
              <Typography
                variant="overline"
                className={css({
                  fontSize: ".8rem",
                  lineHeight: Font.lineHeight(0.8),
                  fontWeight: "bold",
                })}
              >
                {t("play-route.players")}
              </Typography>
              <Box>
                <Typography
                  variant="overline"
                  className={css({
                    fontSize: "1.2rem",
                    lineHeight: Font.lineHeight(1.2),
                  })}
                >
                  {sceneManager.state.scene.players.length + 1}
                </Typography>
                <Typography
                  variant="caption"
                  className={css({
                    fontSize: ".8rem",
                    lineHeight: Font.lineHeight(0.8),
                  })}
                >
                  {" "}
                </Typography>
                <Typography
                  variant="caption"
                  className={css({
                    fontSize: ".8rem",
                    lineHeight: Font.lineHeight(0.8),
                  })}
                >
                  {t("play-route.connected")}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
                {isGM && (
                  <>
                    <Grid item>
                      <Button
                        data-cy="scene.reset-initiative"
                        onClick={() => {
                          sceneManager.actions.resetInitiative();
                          logger.info("Scene:onResetInitiative");
                        }}
                        variant="contained"
                        color="secondary"
                        endIcon={<EmojiPeopleIcon />}
                      >
                        {t("play-route.reset-initiative")}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Tooltip title={t("play-route.add-character-sheet")}>
                        <span>
                          <Button
                            data-cy="scene.add-player"
                            onClick={() => {
                              handleGMAddOfflinePlayer();
                              logger.info("Scene:addPlayer");
                            }}
                            variant="contained"
                            color="secondary"
                          >
                            <PersonAddIcon />
                          </Button>
                        </span>
                      </Tooltip>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Paper className={paperStyle}>
          {everyone.map((player, playerRowIndex) => {
            const isMe = me?.id === player.id;
            const canControl = controllablePlayerIds.includes(player.id);
            const isCharacterInStorage = charactersManager.selectors.isInStorage(
              player.character?.id
            );

            return (
              <React.Fragment key={player.id}>
                {characterDialogPlayerId === player.id && (
                  <CharacterV3Dialog
                    readonly={!canControl}
                    onPoolClick={(element) => {
                      poolManager.actions.addOrRemovePoolElement(element);
                    }}
                    pool={poolManager.state.pool}
                    open={characterDialogPlayerId === player.id}
                    character={player.character}
                    dialog={true}
                    onSave={(updatedCharacter) => {
                      if (isGM) {
                        sceneManager.actions.updatePlayerCharacter(
                          player.id,
                          updatedCharacter
                        );
                      } else {
                        connectionsManager?.actions.sendToHost<IPeerActions>({
                          action: "update-character",
                          payload: updatedCharacter,
                        });
                      }
                      setCharacterDialogPlayerId(undefined);
                    }}
                    onClose={() => {
                      setCharacterDialogPlayerId(undefined);
                    }}
                    synced={isCharacterInStorage}
                    onToggleSync={() => {
                      handleOnToggleCharacterSync(player.character);
                    }}
                  />
                )}

                <PlayerRow
                  data-cy={`scene.player-row.${playerRowIndex}`}
                  permissions={{
                    canRoll: canControl,
                    canUpdatePoints: canControl,
                    canUpdateInitiative: canControl,
                    canLoadCharacterSheet: canControl && !player.isGM,
                    canRemove: isGM && !player.isGM,
                  }}
                  number={playerRowIndex + 1}
                  key={player.id}
                  isMe={isMe}
                  player={player}
                  onPlayerRemove={() => {
                    sceneManager.actions.removePlayer(player.id);
                  }}
                  onCharacterSheetOpen={() => {
                    if (player.character) {
                      setCharacterDialogPlayerId(player.id);
                    }
                  }}
                  onLoadCharacterSheet={() => {
                    charactersManager.actions.openManager(
                      ManagerMode.Use,
                      (character) => {
                        handleLoadCharacterForPlayer(player.id, character);
                      }
                    );
                  }}
                  onDiceRoll={() => {
                    handleSetPlayerRoll(
                      player.id,
                      diceManager.actions.reroll()
                    );
                  }}
                  onPlayedInTurnOrderChange={(playedInTurnOrder) => {
                    if (isGM) {
                      sceneManager.actions.updatePlayerPlayedDuringTurn(
                        player.id,
                        playedInTurnOrder
                      );
                    } else {
                      connectionsManager?.actions.sendToHost<IPeerActions>({
                        action: "played-in-turn-order",
                        payload: playedInTurnOrder,
                      });
                    }
                  }}
                  onPointsChange={(points, maxPoints) => {
                    if (isGM) {
                      sceneManager.actions.updatePlayerCharacterMainPointCounter(
                        player.id,
                        points,
                        maxPoints
                      );
                    } else {
                      connectionsManager?.actions.sendToHost<IPeerActions>({
                        action: "update-main-point-counter",
                        payload: { points, maxPoints },
                      });
                    }
                  }}
                />
              </React.Fragment>
            );
          })}
        </Paper>
      </Box>
    );
  }

  function renderCharacterCards() {
    const {
      playersWithCharacterSheets,
      hasPlayersWithCharacterSheets,
    } = sceneManager.computed;

    return (
      <>
        <Box>
          <Collapse in={hasPlayersWithCharacterSheets}>
            <Box>
              <Box
                className={css({
                  label: "Scene-characters-masonry-content",
                  columnCount: numberOfColumnsForCards,
                  columnWidth: "auto",
                  columnGap: "1rem",
                })}
              >
                {playersWithCharacterSheets.map((player, index) => {
                  const isMe =
                    props.mode === SceneMode.PlayOnline &&
                    props.userId === player.id;
                  const canControl = isGM || isMe;
                  return (
                    <Box
                      key={player?.id || index}
                      className={css({
                        label: "Scene-characters-masonry-card",
                        width: "100%",
                        display: "inline-block",
                        marginBottom: "1rem",
                      })}
                    >
                      <CharacterCard
                        key={player?.id || index}
                        readonly={!canControl}
                        playerName={player.playerName}
                        characterSheet={player.character}
                        onCharacterDialogOpen={() => {
                          setCharacterDialogPlayerId(player.id);
                        }}
                        pool={poolManager.state.pool}
                        onPoolClick={(element) => {
                          poolManager.actions.addOrRemovePoolElement(element);
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Collapse>
        </Box>
      </>
    );
  }

  function renderContent() {
    const tabPanelStyle = css({ padding: "0" });
    return (
      <Box mx=".5rem">
        <Paper
          elevation={2}
          className={css({
            background: lightBackground,
          })}
        >
          <Box>
            <TabContext value={tab}>
              {renderTabs()}
              <Box>
                <Box py="2rem" px="2rem" position="relative" minHeight="20rem">
                  <TabPanel
                    value={"player-characters"}
                    className={tabPanelStyle}
                  >
                    {renderCharacterCards()}
                  </TabPanel>
                  <TabPanel value={"public"} className={tabPanelStyle}>
                    {renderAspects()}
                  </TabPanel>
                  <TabPanel value={"private"} className={tabPanelStyle}>
                    {renderAspects()}
                  </TabPanel>
                  <TabPanel value={"zones"} className={tabPanelStyle}>
                    {renderZones()}
                  </TabPanel>
                  <TabPanel value={"gm-notes"} className={tabPanelStyle}>
                    {renderGmNotes()}
                  </TabPanel>
                </Box>
              </Box>
            </TabContext>
          </Box>
        </Paper>
      </Box>
    );
  }

  function renderGmNotes() {
    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box>
            <Box mb="1rem">
              <FateLabel variant="h6">{t("play-route.gm-notes")}</FateLabel>
            </Box>
            <Box>
              <ContentEditable
                autoFocus
                placeholder={"Scene Notes..."}
                value={sceneManager.state.scene.notes ?? ""}
                onChange={(newNotes) => {
                  sceneManager.actions.setNotes(newNotes);
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  }

  function renderZones() {
    const tokenTitles = sceneManager.state.scene.players.map(
      (p) => (p.character?.name ?? p.playerName) as string
    );
    return (
      <Box
        border={`1px solid ${theme.palette.divider}`}
        maxWidth="600px"
        margin="0 auto"
      >
        <DrawArea
          objects={sceneManager.state.scene.drawAreaObjects}
          readonly={!isGM}
          tokenTitles={tokenTitles}
          onChange={(lines) => {
            sceneManager.actions.updateDrawAreaObjects(lines);
          }}
        />
      </Box>
    );
  }

  function renderAspects() {
    const aspectIdsToShow = Object.keys(
      sceneManager.state.scene.aspects
    ).filter((id) => {
      const aspect = sceneManager.state.scene.aspects[id];

      if (tab === "private") {
        return aspect.isPrivate;
      } else {
        return !aspect.isPrivate;
      }
    });

    const hasAspects = aspectIdsToShow.length > 0;

    const sortedAspectIds = arraySort(aspectIdsToShow, [
      function sortByPinned(id) {
        const aspect = sceneManager.state.scene.aspects[id];
        return { value: aspect.pinned, direction: "asc" };
      },
      function sortByType(id) {
        const aspect = sceneManager.state.scene.aspects[id];
        return { value: aspect.type, direction: "asc" };
      },
    ]);
    const aspectsToRender = sceneManager.state.scene.sort
      ? sortedAspectIds
      : aspectIdsToShow;

    return (
      <Box>
        <Box>{renderGMAspectActions()}</Box>

        {hasAspects && (
          <Box
            className={css({
              label: "Scene-aspect-masonry-content",
              columnCount: numberOfColumnsForCards,
              columnWidth: "auto",
              columnGap: "1rem",
            })}
          >
            {aspectsToRender.map((aspectId, index) => {
              return (
                <Box
                  key={aspectId}
                  className={css({
                    label: "Scene-aspect-masonry-card",
                    width: "100%",
                    display: "inline-block",
                    marginBottom: "1rem",
                  })}
                >
                  <IndexCard
                    index={index}
                    key={aspectId}
                    data-cy={`scene.aspect.${index}`}
                    id={`index-card-${aspectId}`}
                    aspectId={aspectId}
                    readonly={!isGM}
                    showClickableSkills={props.mode !== SceneMode.Manage}
                    sceneManager={sceneManager}
                    onRoll={(label, modifier) => {
                      const options: Array<IDiceCommandOption> = [
                        ...DefaultDiceCommandOptionList,
                      ];
                      options.push({
                        type: RollType.Modifier,
                        label: label,
                        modifier: modifier,
                      });
                      const result = diceManager.actions.roll(options, {
                        listResults: false,
                      });
                      handleSetRoll(result);
                    }}
                    onMove={(dragIndex, hoverIndex) => {
                      sceneManager.actions.moveAspects(dragIndex, hoverIndex);
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        )}
        {!hasAspects && (
          <Box py="6rem" textAlign="center">
            <Typography
              variant="h6"
              className={css({
                fontWeight: theme.typography.fontWeightBold,
              })}
            >
              {t("play-route.no-aspects")}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  function renderTabs() {
    const tabClass = css({
      textTransform: "none",
    });
    return (
      <Box>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={tab}
          classes={{
            root: css({
              borderBottom: `1px solid ${theme.palette.divider}`,
            }),
            indicator: css({
              background: theme.palette.primary.main,
            }),
          }}
          onChange={(e, newValue) => {
            setTab(newValue);
          }}
        >
          {props.mode !== SceneMode.Manage && (
            <Tab
              value="player-characters"
              data-cy="scene.tabs.player-characters"
              label={t("menu.characters")}
              classes={{ root: tabClass }}
              icon={<PeopleAltIcon />}
            />
          )}
          <Tab
            value="public"
            data-cy="scene.tabs.public"
            label={t("play-route.public")}
            classes={{ root: tabClass }}
            icon={<VisibilityIcon />}
          />
          {isManaging && (
            <Tab
              value="private"
              data-cy="scene.tabs.private"
              label={t("play-route.private")}
              classes={{ root: tabClass }}
              icon={<VisibilityOffIcon />}
            />
          )}
          {props.mode !== SceneMode.Manage && (
            <Tab
              value="zones"
              data-cy="scene.tabs.zones"
              label={t("play-route.zones")}
              classes={{ root: tabClass }}
              icon={<FilterHdrIcon />}
            />
          )}
          {isManaging && (
            <Tab
              value="gm-notes"
              data-cy="scene.tabs.gm-notes"
              label={t("play-route.gm-notes")}
              classes={{ root: tabClass }}
              icon={<BorderColorIcon />}
            />
          )}
        </Tabs>
      </Box>
    );
  }

  function renderHeader() {
    return (
      <Box mx=".5rem" mb="2rem">
        <Box>
          <Container maxWidth="sm">
            <Box>{renderManagementActions()}</Box>
          </Container>
        </Box>
        <Box>
          <Container maxWidth="sm">
            <Box mb=".5rem">
              <FateLabel
                variant="h4"
                uppercase={false}
                className={css({
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  textAlign: "center",
                })}
              >
                <ContentEditable
                  autoFocus
                  data-cy="scene.name"
                  value={sceneManager.state.scene.name}
                  readonly={!isGM}
                  onChange={(value) => {
                    sceneManager.actions.updateName(value);
                  }}
                />
              </FateLabel>
              <FormHelperText className={css({ textAlign: "right" })}>
                {t("play-route.scene-name")}
              </FormHelperText>
            </Box>
            <Collapse in={!!sceneManager.state.scene.name}>
              <Box mb="1rem">
                <Grid
                  container
                  spacing={2}
                  wrap="nowrap"
                  justify="center"
                  alignItems="flex-end"
                >
                  <Grid item>
                    <FateLabel>{t("play-route.group")}</FateLabel>
                  </Grid>
                  <Grid item xs={8} sm={4}>
                    <Autocomplete
                      freeSolo
                      options={scenesManager.state.groups.filter((g) => {
                        const currentGroup =
                          sceneManager.state.scene.group ?? "";
                        return g.toLowerCase().includes(currentGroup);
                      })}
                      value={sceneManager.state.scene.group ?? ""}
                      onChange={(event, newValue) => {
                        sceneManager.actions.setGroup(newValue);
                      }}
                      inputValue={sceneManager.state.scene.group ?? ""}
                      onInputChange={(event, newInputValue) => {
                        sceneManager.actions.setGroup(newInputValue);
                      }}
                      disabled={!isGM}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                          }}
                          data-cy="scene.group"
                          inputProps={{
                            ...params.inputProps,
                            className: css({ padding: "2px" }),
                          }}
                          className={css({
                            borderBottom: `1px solid ${theme.palette.divider}`,
                          })}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </Container>
        </Box>
        <Box>
          <Container maxWidth="sm">
            <Box>{renderGMSceneActions()}</Box>
          </Container>
        </Box>
      </Box>
    );
  }

  function renderGMAspectActions() {
    if (!isGM) {
      return null;
    }
    return (
      <Box pb="2rem">
        <Grid container spacing={1} justify="center">
          <Grid item>
            <ButtonGroup
              color="primary"
              variant="contained"
              orientation={isSMAndDown ? "vertical" : "horizontal"}
            >
              <Button
                data-cy="scene.add-index-card"
                onClick={() => {
                  sceneManager.actions.addAspect(
                    AspectType.IndexCard,
                    isPrivate
                  );
                  logger.info("Scene:onAddCard:IndexCard");
                }}
                endIcon={<AddCircleOutlineIcon />}
              >
                {t("play-route.add-index-card")}
              </Button>
              <Button
                data-cy="scene.add-aspect"
                onClick={() => {
                  sceneManager.actions.addAspect(AspectType.Aspect, isPrivate);
                  logger.info("Scene:onAddCard:Aspect");
                }}
                endIcon={<AddCircleOutlineIcon />}
              >
                {t("play-route.add-aspect")}
              </Button>
              <Button
                data-cy="scene.add-boost"
                onClick={() => {
                  sceneManager.actions.addAspect(AspectType.Boost, isPrivate);
                  logger.info("Scene:onAddCard:Boost");
                }}
                endIcon={<AddCircleOutlineIcon />}
              >
                {t("play-route.add-boost")}
              </Button>
              <Button
                data-cy="scene.add-npc"
                onClick={() => {
                  sceneManager.actions.addAspect(AspectType.NPC, isPrivate);
                  logger.info("Scene:onAddCard:NPC");
                }}
                endIcon={<AddCircleOutlineIcon />}
              >
                {t("play-route.add-npc")}
              </Button>
              <Button
                data-cy="scene.add-bad-guy"
                onClick={() => {
                  sceneManager.actions.addAspect(AspectType.BadGuy, isPrivate);
                  logger.info("Scene:onAddCard:BadGuy");
                }}
                endIcon={<AddCircleOutlineIcon />}
              >
                {t("play-route.add-bad-guy")}
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    );
  }

  function renderGMSceneActions() {
    if (!isGM) {
      return null;
    }
    return (
      <Box pb="1rem">
        <Grid container spacing={1} justify="center" alignItems="center">
          {props.mode === SceneMode.PlayOnline && (
            <Grid item>
              <Button
                onClick={() => {
                  sceneManager.actions.fireGoodConfetti();
                  logger.info("Scene:onFireGoodConfetti");
                }}
                variant="text"
                color="primary"
              >
                <ThumbUpIcon />
              </Button>
            </Grid>
          )}
          {props.mode === SceneMode.PlayOnline && (
            <Grid item>
              <Button
                onClick={() => {
                  sceneManager.actions.fireBadConfetti();
                  logger.info("Scene:onFireBadConfetti");
                }}
                variant="text"
                color="primary"
              >
                <ThumbDownIcon />
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              data-cy="scene.sort"
              onClick={() => {
                props.sceneManager.actions.toggleSort();
                logger.info("Scene:onSort");
              }}
              variant="outlined"
              color={
                props.sceneManager.state.scene.sort ? "primary" : "default"
              }
              endIcon={<SortIcon />}
            >
              {t("play-route.sort")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }

  function renderCopyGameLink(link: string) {
    return (
      <>
        <input
          ref={$shareLinkInputRef}
          type="text"
          value={link}
          readOnly
          hidden
        />
        <Tooltip open={shareLinkToolTip.open} title="Copied!" placement="top">
          <span>
            <Button
              onClick={() => {
                if (link && $shareLinkInputRef.current) {
                  try {
                    $shareLinkInputRef.current.select();
                    document.execCommand("copy");
                    navigator.clipboard.writeText(link);
                    setShareLinkToolTip({ open: true });
                  } catch (error) {
                    window.open(link, "_blank");
                  }

                  logger.info("Scene:onCopyGameLink");
                }
              }}
              variant="outlined"
              color={shareLinkToolTip.open ? "primary" : "default"}
              endIcon={<FileCopyIcon />}
            >
              {t("play-route.copy-game-link")}
            </Button>
          </span>
        </Tooltip>
      </>
    );
  }

  function renderManagementActions() {
    if (!isGM) {
      return null;
    }

    return (
      <Box pb="1rem">
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item>
            <Button
              color="primary"
              data-cy="scene.save"
              endIcon={<SaveIcon />}
              variant={sceneManager.state.dirty ? "contained" : "outlined"}
              onClick={() => {
                scenesManager.actions.upsert(sceneManager.state.scene);
                sceneManager.actions.loadScene(sceneManager.state.scene, true);
                setSavedSnack(true);
                logger.info("Scene:onSave");
              }}
            >
              {t("play-route.save-scene")}
            </Button>
          </Grid>
          {props.mode === SceneMode.PlayOnline && props.shareLink && (
            <Grid item>{renderCopyGameLink(props.shareLink)}</Grid>
          )}
          {props.mode !== SceneMode.Manage && (
            <Grid item>
              <ThemeProvider theme={errorTheme}>
                <Button
                  variant="text"
                  color="primary"
                  data-cy="scene.new-scene"
                  endIcon={<ErrorIcon />}
                  className={css({
                    borderRadius: "20px",
                    fontWeight: theme.typography.fontWeightBold,
                  })}
                  onClick={() => {
                    const confirmed = confirm(
                      t("play-route.reset-scene-confirmation")
                    );
                    if (confirmed) {
                      sceneManager.actions.resetScene();
                      logger.info("Scene:onReset");
                    }
                  }}
                >
                  {t("play-route.new-scene")}
                </Button>
              </ThemeProvider>
            </Grid>
          )}
          {props.mode !== SceneMode.Manage && (
            <Grid item>
              <IconButton
                ref={$menu}
                size="small"
                data-cy={`scene.menu`}
                onClick={() => {
                  setMenuOpen(true);
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={$menu.current}
                keepMounted
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={menuOpen}
                onClose={() => {
                  setMenuOpen(false);
                }}
              >
                <MenuItem
                  data-cy="scene.load-scene"
                  onClick={() => {
                    scenesManager.actions.openManager(
                      ManagerMode.Use,
                      handleLoadScene
                    );
                    setMenuOpen(false);
                    logger.info("Scene:onLoadScene");
                  }}
                >
                  <ListItemIcon className={css({ minWidth: "2rem" })}>
                    <RotateLeftIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={t("play-route.load-scene")} />
                </MenuItem>
                <MenuItem
                  data-cy="scene.clone-and-load-scene"
                  onClick={() => {
                    scenesManager.actions.openManager(
                      ManagerMode.Use,
                      handleCloneAndLoadScene
                    );
                    setMenuOpen(false);
                    logger.info("Scene:onCloneAndLoadScene");
                  }}
                >
                  <ListItemIcon className={css({ minWidth: "2rem" })}>
                    <FileCopyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("play-route.clone-and-load-scene")}
                  />
                </MenuItem>
              </Menu>
            </Grid>
          )}
        </Grid>
      </Box>
    );
  }

  function renderPageError() {
    return (
      <Box>
        <Box display="flex" justifyContent="center" pb="2rem">
          <Typography variant="h4">{t("play-route.error.title")}</Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography variant="h6">
            {t("play-route.error.description1")}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography variant="h6">
            {t("play-route.error.description2")}
          </Typography>
        </Box>
      </Box>
    );
  }

  function getLiveMode() {
    if (props.mode === SceneMode.PlayOffline) {
      return LiveMode.Live;
    }
    if (props.mode === SceneMode.Manage) {
      return undefined;
    }
    if (props.isLoading) {
      return LiveMode.Connecting;
    }
    return LiveMode.Live;
  }
};
Scene.displayName = "Scene";
