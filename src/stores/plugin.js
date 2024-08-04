import { loadPreferences, savePreferences } from "../libs/utils";

export function JSONPersistencePlugin({ store, options }) {
    if (options.persist && options.json) {
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

export const LocalStoragePlugin = ({ store, options } ) => {
  const key = 'settings'

  if (options.persist && options.localStorage) {
    const restoreState = () => {
      let item = localStorage.getItem( key)
      if ( item ) {
        store.$patch(JSON.parse(item))
      }
    }

    restoreState()

    store.$subscribe( (mutation, state ) => {
      localStorage.setItem(key, JSON.stringify(state))
    } )
  }
}