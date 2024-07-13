import { loadPreferences, savePreferences } from "../libs/utils";

export function JSONPersistencePlugin({ store, options }) {
    if (options.persist) {
      // Restore state when the store is created
      const restoreState = async () => {
        try {
          const savedState = await loadPreferences()
          if (savedState) {
            store.$patch(savedState);
          }
        } catch (error) {
          console.error('Error restoring state:', error);
        }
      };

      restoreState();

      // Save state after each mutation
      store.$subscribe(async (mutation, state) => {
        await savePreferences(state)
      });
    }
}