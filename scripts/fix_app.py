import re

app_file = "src/App.jsx"
with open(app_file, "r", encoding="utf-8") as f:
    app_data = f.read()

# 1. Imports
app_data = app_data.replace(
    "import { TraitSelectionModal } from './components/TraitSelectionModal';",
    "import { RoleSelectionModal } from './components/RoleSelectionModal';"
)

app_data = app_data.replace(
    "import { checkNewTraits } from './utils/traitsData';",
    ""
)

# 2. Perks
app_data = app_data.replace("perks: [],", "")
app_data = app_data.replace("isSelectingPerk: false,", "")
app_data = app_data.replace("isSelectingPerk: true,", "")

# 3. getsPerk
match = re.search(r'const availablePerks.*?if \(getsPerk\) \{.*?\}\s*', app_data, re.DOTALL)
if match:
    app_data = app_data.replace(match.group(0), "")

# 4. handleSelectPerk
match = re.search(r'const handleSelectPerk = .*?isSelectingPerk: false,.*?\}\s*\};\s*', app_data, re.DOTALL)
if match:
    app_data = app_data.replace(match.group(0), "")

# 5. handleTraitSelection -> handleRoleSelection
old_trait = """  const handleTraitSelection = (traitId) => {
    setGameState(prev => ({
      ...prev,
      needsTraitSelection: false,
      player: {
        ...prev.player,
        traits: [...(prev.player.traits || []), traitId]
      }
    }));
  };"""

new_role = """  const handleRoleSelection = (role) => {
    setGameState(prev => {
      const updatedAttributes = { ...prev.player.attributes };
      if (role.effect) {
        Object.entries(role.effect).forEach(([attr, val]) => {
           updatedAttributes[attr] = Math.max(1, Math.min(99, (updatedAttributes[attr] || 50) + val));
        });
      }
      return {
        ...prev,
        needsTraitSelection: false,
        player: {
          ...prev.player,
          attributes: updatedAttributes,
          roleId: role.id
        }
      };
    });
  };"""

if old_trait in app_data:
    app_data = app_data.replace(old_trait, new_role)
else:
    match = re.search(r'const handleTraitSelection =.*?\}\)\);\s*\};', app_data, re.DOTALL)
    if match:
        app_data = app_data.replace(match.group(0), new_role)

# 6. Render TraitSelectionModal -> RoleSelectionModal
old_render = """    {gameState?.needsTraitSelection && (
      <TraitSelectionModal onSelect={handleTraitSelection} />
    )}"""
new_render = """    {gameState?.needsTraitSelection && (
      <RoleSelectionModal onSelect={handleRoleSelection} playerPosition={gameState.player.position} />
    )}"""
if old_render in app_data:
    app_data = app_data.replace(old_render, new_render)
else:
    match = re.search(r'\{gameState\?\.needsTraitSelection && \(\s*<TraitSelectionModal onSelect=\{handleTraitSelection\} />\s*\)\}', app_data, re.DOTALL)
    if match:
        app_data = app_data.replace(match.group(0), new_render)

# Remove onSelectPerk prop from Dashboard
app_data = app_data.replace("onSelectPerk={handleSelectPerk}", "")

# 7. Final InteractiveMatch
# Find handleContinueFromInteractiveMatch and replace it with two functions
old_interactive = """  const handleContinueFromInteractiveMatch = () => {
    setGameState((prev) => {
      // Si on n'a pas fini les 3 phases
      if (prev.interactiveMatchCurrentPhaseIndex < 2) {
        return {
          ...prev,
          interactiveMatchCurrentPhaseIndex: prev.interactiveMatchCurrentPhaseIndex + 1,
          interactiveMatchResult: null
        };
      }

      // Fin du match
      const isWinner = prev.interactiveMatchScore > 0 || (prev.interactiveMatchScore === 0 && Math.random() > 0.5); // Tirs au but 50/50 si galit
      
      if (prev.pendingStats?.isDerby) {
        let confs = { ...(prev.rivalConfrontations || { won: 0, lost: 0, drawn: 0 }) };
        let newMorale = prev.player.morale || 50;
        
        if (prev.interactiveMatchScore > 0) {
          confs.won += 1;
          newMorale = Math.min(100, newMorale + 15);
        } else if (prev.interactiveMatchScore === 0) {
          confs.drawn += 1;
        } else {
          confs.lost += 1;
          newMorale = Math.max(0, newMorale - 10);
        }

        return {
          ...prev,
          isInteractiveMatch: false,
          interactiveMatchResult: null,
          interactiveMatchPhases: null,
          interactiveMatchCurrentPhaseIndex: 0,
          interactiveMatchScore: 0,
          rivalConfrontations: confs,
          player: { ...prev.player, morale: newMorale },
          pendingStats: null
        };
      } else {
        return finalizeSeasonDirectly(
          prev,
          prev.pendingStats.tournamentStats,
          { success: isWinner },
          prev.completedEvents,
          null
        );
      }
    });
  };"""

new_interactive = """  const handleContinueFromInteractiveMatch = () => {
    setGameState((prev) => {
      // Si on n'a pas fini les 3 phases
      if (prev.interactiveMatchCurrentPhaseIndex < 2) {
        return {
          ...prev,
          interactiveMatchCurrentPhaseIndex: prev.interactiveMatchCurrentPhaseIndex + 1,
          interactiveMatchResult: null
        };
      }

      // Fin du match : Affiche l'cran final au lieu de fermer direct
      const isWinner = prev.interactiveMatchScore > 0 || (prev.interactiveMatchScore === 0 && Math.random() > 0.5); // Tirs au but
      
      return {
        ...prev,
        interactiveMatchFinalOutcome: isWinner ? 'win' : 'loss'
      };
    });
  };

  const handleCloseInteractiveMatch = () => {
    setGameState((prev) => {
      const isWinner = prev.interactiveMatchFinalOutcome === 'win';
      if (prev.pendingStats?.isDerby) {
        let confs = { ...(prev.rivalConfrontations || { won: 0, lost: 0, drawn: 0 }) };
        let newMorale = prev.player.morale || 50;
        
        if (prev.interactiveMatchScore > 0) {
          confs.won += 1;
          newMorale = Math.min(100, newMorale + 15);
        } else if (prev.interactiveMatchScore === 0) {
          confs.drawn += 1;
        } else {
          confs.lost += 1;
          newMorale = Math.max(0, newMorale - 10);
        }

        return {
          ...prev,
          isInteractiveMatch: false,
          interactiveMatchResult: null,
          interactiveMatchPhases: null,
          interactiveMatchCurrentPhaseIndex: 0,
          interactiveMatchScore: 0,
          interactiveMatchFinalOutcome: null,
          rivalConfrontations: confs,
          player: { ...prev.player, morale: newMorale },
          pendingStats: null
        };
      } else {
        return finalizeSeasonDirectly(
          prev,
          prev.pendingStats.tournamentStats,
          { success: isWinner },
          prev.completedEvents,
          null
        );
      }
    });
  };"""

if old_interactive in app_data:
    app_data = app_data.replace(old_interactive, new_interactive)
else:
    # Try regex
    match = re.search(r'const handleContinueFromInteractiveMatch =.*?\}\);\s*\};', app_data, re.DOTALL)
    if match:
        app_data = app_data.replace(match.group(0), new_interactive)

# Add onCloseInteractiveMatch to Dashboard props
app_data = app_data.replace(
    "onContinueFromInteractiveMatch={handleContinueFromInteractiveMatch}",
    "onContinueFromInteractiveMatch={handleContinueFromInteractiveMatch}\n      onCloseInteractiveMatch={handleCloseInteractiveMatch}"
)

# Initialize interactiveMatchFinalOutcome: null
app_data = app_data.replace(
    "interactiveMatchResult: null,",
    "interactiveMatchResult: null,\n      interactiveMatchFinalOutcome: null,"
)
app_data = app_data.replace(
    "interactiveMatchResult: null\n",
    "interactiveMatchResult: null,\n      interactiveMatchFinalOutcome: null\n"
)

with open(app_file, "w", encoding="utf-8") as f:
    f.write(app_data)
print("Updated App.jsx")
