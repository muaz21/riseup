import React, { useState, useCallback } from 'react';
// Hook for managing enrollment flow
import { useAuth } from '../contexts/AuthContext';
import { pathsApi, LearningPath, EnrollmentStatus } from '../services/pathsApi';
import { ConfirmEnrollModal } from '../components/modals/ConfirmEnrollModal';
import { SuccessModal } from '../components/modals/SuccessModal';
import { LoginModal } from '../components/modals/LoginModal';

interface UseEnrollmentReturn {
  handleEnroll: (path: LearningPath) => void;
  isEnrolling: boolean;
  enrollmentStatus: EnrollmentStatus | null;
  checkEnrollment: (pathId: number) => Promise<EnrollmentStatus>;
  modals: React.ReactNode;
}

export function useEnrollment(): UseEnrollmentReturn {
  const { isAuthenticated, user } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [moodleUrl, setMoodleUrl] = useState<string | null>(null);

  const checkEnrollment = useCallback(async (pathId: number) => {
    try {
      const status = await pathsApi.checkEnrollmentStatus(pathId);
      setEnrollmentStatus(status);
      return status;
    } catch (error) {
      console.error('Error checking enrollment status:', error);
      setEnrollmentStatus({ isEnrolled: false });
      return { isEnrolled: false };
    }
  }, []);

  const handleEnroll = useCallback(
    async (path: LearningPath) => {
      // Step 1: Check authentication
      if (!isAuthenticated || !user) {
        setSelectedPath(path);
        setShowLoginModal(true);
        return;
      }

      // Step 2: Check if already enrolled
      try {
        const status = await checkEnrollment(path.id);
        if (status.isEnrolled && status.moodleUrl) {
          // Already enrolled - redirect to Moodle
          window.open(status.moodleUrl, '_blank');
          return;
        }
      } catch (error) {
        console.error('Error checking enrollment:', error);
      }

      // Step 3: Show confirmation modal
      setSelectedPath(path);
      setShowConfirmModal(true);
    },
    [isAuthenticated, user, checkEnrollment]
  );

  const handleConfirmEnroll = useCallback(async () => {
    if (!selectedPath || !user) return;

    setIsEnrolling(true);
    try {
      const response = await pathsApi.enrollInPath(selectedPath.id, user.id);
      setMoodleUrl(response.moodleUrl);
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsEnrolling(false);
    }
  }, [selectedPath, user]);

  const handleLoginSuccess = useCallback(() => {
    if (selectedPath) {
      // Retry enrollment after login
      handleEnroll(selectedPath);
    }
  }, [selectedPath, handleEnroll]);

  const handleSuccessRedirect = useCallback(() => {
    if (moodleUrl) {
      window.open(moodleUrl, '_blank');
    }
  }, [moodleUrl]);

  const modals = (
    <>
      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
      <ConfirmEnrollModal
        open={showConfirmModal}
        onOpenChange={setShowConfirmModal}
        path={selectedPath}
        onConfirm={handleConfirmEnroll}
        isLoading={isEnrolling}
      />
      <SuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        onRedirect={handleSuccessRedirect}
        redirectDelay={3000}
      />
    </>
  );

  return {
    handleEnroll,
    isEnrolling,
    enrollmentStatus,
    checkEnrollment,
    modals,
  };
}

