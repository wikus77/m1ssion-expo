import { useState, useEffect, useCallback, useRef } from "react";
import { useProfileNotifications } from "@/hooks/profile/useProfileNotifications";
import { useNotifications, NOTIFICATION_CATEGORIES } from "@/hooks/useNotifications";
import { toast } from "sonner";

export function useNotificationManager() {
  const { showNotifications, setShowNotifications } = useProfileNotifications();
  const { 
    notifications, 
    unreadCount, 
    markAllAsRead, 
    markAsRead, 
    addNotification, 
    deleteNotification,
    reloadNotifications 
  } = useNotifications();
  
  const [notificationsBannerOpen, setNotificationsBannerOpen] = useState(false);
  
  // FIXED: Reduced polling interval to 5 seconds for better responsiveness
  const pollingIntervalRef = useRef<number | null>(null);
  const isInitialLoadDone = useRef<boolean>(false);
  
  // FIXED: Setup notification polling every 5 seconds instead of 3 minutes
  useEffect(() => {
    const startPolling = () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      
      // FIXED: Poll every 5 seconds instead of 180 seconds
      pollingIntervalRef.current = window.setInterval(() => {
        if (document.visibilityState === 'visible') {
          console.log('🔄 NOTIFICATION_MANAGER: Polling for new notifications...');
          reloadNotifications();
        } else {
          console.log('⏸️ NOTIFICATION_MANAGER: Skipping polling - page not visible');
        }
      }, 5000) as unknown as number; // 5 seconds
    };
    
    // Initial load
    if (!isInitialLoadDone.current) {
      reloadNotifications().then(() => {
        console.log('📱 NOTIFICATION_MANAGER: Initial notifications loaded');
        isInitialLoadDone.current = true;
        startPolling();
      });
    }
    
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [reloadNotifications]);

  // Handle opening notifications banner
  const openNotificationsBanner = useCallback(() => {
    setNotificationsBannerOpen(true);
  }, []);

  // Handle closing notifications banner
  const closeNotificationsBanner = useCallback(() => {
    setNotificationsBannerOpen(false);
  }, []);

  // Handle opening notifications drawer
  const openNotificationsDrawer = useCallback(() => {
    setShowNotifications(true);
    // FIXED: Always reload when drawer opens for fresh data
    console.log('📱 NOTIFICATION_MANAGER: Drawer opened, reloading notifications');
    reloadNotifications();
  }, [setShowNotifications, reloadNotifications]);

  // Handle closing notifications drawer
  const closeNotificationsDrawer = useCallback(() => {
    setShowNotifications(false);
    // Mark notifications as read when drawer is closed
    markAllAsRead().then(() => {
      console.log('✅ NOTIFICATION_MANAGER: All notifications marked as read on drawer close');
    });
  }, [setShowNotifications, markAllAsRead]);

  // FIXED: Enhanced notification creation with immediate reload
  const createNotification = useCallback(async (title: string, description: string, type = NOTIFICATION_CATEGORIES.GENERIC) => {
    console.log(`📝 NOTIFICATION_MANAGER: Creating notification of type ${type}:`, title);
    
    // Use sonner toast to show notification
    toast(title, {
      description
    });
    
    // Add to notification system
    try {
      const result = await addNotification({ 
        title, 
        description, 
        type 
      });
      
      if (result) {
        console.log('✅ NOTIFICATION_MANAGER: Notification created successfully');
        // FIXED: Force reload after successful creation
        setTimeout(() => {
          console.log('🔄 NOTIFICATION_MANAGER: Reloading after notification creation');
          reloadNotifications();
        }, 500);
      } else {
        console.error("❌ NOTIFICATION_MANAGER: Failed to create notification");
      }
      
      return result;
    } catch (error) {
      console.error("❌ NOTIFICATION_MANAGER: Error creating notification:", error);
      return false;
    }
  }, [addNotification, reloadNotifications]);

  // Create BUZZ notification
  const createBuzzNotification = useCallback(async (title: string, description: string) => {
    return await createNotification(title, description, NOTIFICATION_CATEGORIES.BUZZ);
  }, [createNotification]);

  // Create Map BUZZ notification
  const createMapBuzzNotification = useCallback(async (title: string, description: string) => {
    return await createNotification(title, description, NOTIFICATION_CATEGORIES.MAP_BUZZ);
  }, [createNotification]);

  // Create Leaderboard notification
  const createLeaderboardNotification = useCallback(async (title: string, description: string) => {
    return await createNotification(title, description, NOTIFICATION_CATEGORIES.LEADERBOARD);
  }, [createNotification]);

  // Create Weekly notification
  const createWeeklyNotification = useCallback(async (title: string, description: string) => {
    return await createNotification(title, description, NOTIFICATION_CATEGORIES.WEEKLY);
  }, [createNotification]);

  // FIXED: Manual reload function with immediate execution
  const manualReload = useCallback(async () => {
    console.log("🔄 NOTIFICATION_MANAGER: Manual notification reload requested");
    return await reloadNotifications();
  }, [reloadNotifications]);

  return {
    // Notification data
    notifications,
    unreadCount,
    
    // Banner controls
    notificationsBannerOpen,
    openNotificationsBanner,
    closeNotificationsBanner,
    
    // Drawer controls
    notificationsDrawerOpen: showNotifications,
    openNotificationsDrawer,
    closeNotificationsDrawer,
    
    // Actions
    markAllAsRead,
    markAsRead,
    deleteNotification,
    
    // Create notifications by category
    createNotification, // Generic
    createBuzzNotification,
    createMapBuzzNotification,
    createLeaderboardNotification,
    createWeeklyNotification,
    
    reloadNotifications: manualReload
  };
}
