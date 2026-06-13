import React, { createContext, useCallback, useContext, useState } from 'react';
import { ActionSheet, ActionSheetItem } from './action-sheet';

interface ActionSheetContextType {
  show: (options: ShowActionSheetOptions) => void;
  hide: () => void;
}

interface ShowActionSheetOptions {
  items: ActionSheetItem[];
  title?: string;
  titleColor?: string;
  itemColor?: string;
  backgroundColor?: string;
  overlayColor?: string;
}

const ActionSheetContext = createContext<ActionSheetContextType | undefined>(undefined);

export function ActionSheetProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<ShowActionSheetOptions>({
    items: [],
  });

  const show = useCallback((options: ShowActionSheetOptions) => {
    setState(options);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <ActionSheetContext.Provider value={{ show, hide }}>
      {children}
      <ActionSheet
        visible={visible}
        items={state.items}
        onClose={hide}
        title={state.title}
        titleColor={state.titleColor}
        itemColor={state.itemColor}
        backgroundColor={state.backgroundColor}
        overlayColor={state.overlayColor}
      />
    </ActionSheetContext.Provider>
  );
}

export function useActionSheet() {
  const context = useContext(ActionSheetContext);
  if (!context) {
    throw new Error('useActionSheet must be used within ActionSheetProvider');
  }
  return context;
}
