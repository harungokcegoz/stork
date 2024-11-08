import { useState, useCallback, useEffect } from "react";

import { Name, SwipeDirection } from "../models/types";
import { useNameStore } from "../store/nameStore";

export const useNameViewModel = () => {
  const {
    names,
    lastDismissed,
    addToFavorites,
    removeFromNames,
    setLastDismissed,
    undoLastDismiss,
    initializeNames,
  } = useNameStore();

  const [currentIndex, setCurrentIndex] = useState(0);

  const VISIBLE_CARDS = 3; // Number of cards to show in the stack

  useEffect(() => {
    initializeNames();
  }, [initializeNames]);

  const getCurrentName = useCallback((): Name | undefined => {
    return names[currentIndex];
  }, [names, currentIndex]);

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      const currentName = getCurrentName();

      if (!currentName) return;

      if (direction === "left") {
        setLastDismissed(currentName);
        removeFromNames(currentName.id);
      } else if (direction === "right") {
        addToFavorites({ ...currentName, rating: 0 });
        removeFromNames(currentName.id);
      }

      setCurrentIndex((prev) => prev + 1);
    },
    [getCurrentName, setLastDismissed, removeFromNames, addToFavorites],
  );

  const handleSuperLike = useCallback(
    (nameId: string) => {
      const name = names.find((n) => n.id === nameId);
      if (!name) return;

      addToFavorites({ ...name, rating: 5 });
      removeFromNames(nameId);
      setCurrentIndex((prev) => prev + 1);
    },
    [names, addToFavorites, removeFromNames],
  );

  const handleUndo = useCallback(() => {
    if (lastDismissed && currentIndex > 0) {
      undoLastDismiss(lastDismissed);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [lastDismissed, currentIndex, undoLastDismiss]);

  const getVisibleNames = () => {
    // Return the next VISIBLE_CARDS names from the current position
    return names.slice(currentIndex, currentIndex + VISIBLE_CARDS);
  };

  return {
    getVisibleNames,
    handleSwipe,
    handleSuperLike,
    handleUndo,
    hasMoreNames: currentIndex < names.length,
  };
};
