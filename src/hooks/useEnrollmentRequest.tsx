import React, { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { pathsApi, LearningPath } from '../services/pathsApi';
import { RequestEnrollModal } from '../components/modals/RequestEnrollModal';
import { SuccessModal } from '../components/modals/SuccessModal';

interface UseEnrollmentRequestReturn {
  handleRequestEnrollment: (path: LearningPath) => void;
  isRequesting: boolean;
  modals: React.ReactNode;
}

export function useEnrollmentRequest(): UseEnrollmentRequestReturn {
  const { isAuthenticated, user } = useAuth();
  const [isRequesting, setIsRequesting] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  const handleRequestEnrollment = useCallback(
    (path: LearningPath) => {
      // Check authentication
      if (!isAuthenticated || !user) {
        // Could show login modal here if needed
        alert('يجب تسجيل الدخول أولاً');
        return;
      }

      setSelectedPath(path);
      setShowRequestModal(true);
    },
    [isAuthenticated, user]
  );

  const handleConfirmRequest = useCallback(async () => {
    if (!selectedPath || !user) return;

    setIsRequesting(true);
    try {
      await pathsApi.createEnrollmentRequest(selectedPath.id, user.id);
      setShowRequestModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Request error:', error);
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsRequesting(false);
    }
  }, [selectedPath, user]);

  const modals = (
    <>
      <RequestEnrollModal
        open={showRequestModal}
        onOpenChange={setShowRequestModal}
        path={selectedPath}
        onConfirm={handleConfirmRequest}
        isLoading={isRequesting}
      />
      <SuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        redirectDelay={0}
        customMessage={selectedPath ? {
          titleAr: 'تم إرسال طلبك بنجاح!',
          titleEn: 'Request Sent Successfully!',
          messageAr: 'تم إرسال طلب الالتحاق بنجاح. سنتواصل معك قريباً عبر البريد الإلكتروني أو الهاتف.',
          messageEn: 'Your enrollment request has been sent successfully. We will contact you soon via email or phone.',
        } : undefined}
      />
    </>
  );

  return {
    handleRequestEnrollment,
    isRequesting,
    modals,
  };
}

