import * as React from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { Box, ScrollArea, IconButton, BoxProps, Flex } from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { keyframes, styled } from 'styled-components';

export const DRAWER_CLOSE_ANIMATION_MS = 300;

/* -------------------------------------------------------------------------------------------------
 * Animations
 * -----------------------------------------------------------------------------------------------*/

// Direction: up
const slideUpFromBottomIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUpFromBottomOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
`;

// Direction: left
const slideLeftFromRightIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideLeftFromRightOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Drawer.Root
 * -----------------------------------------------------------------------------------------------*/

const DrawerRoot = ({
  isVisible,
  onClose,

  children,
}: {
  isVisible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Dialog.Root
      open={isVisible}
      onOpenChange={(nextVisible) => !nextVisible && onClose?.()}
      modal={false}
    >
      <Dialog.Portal>
        <div>{children}</div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Drawer.Content - composable content slot (collapsible when isContentExpanded is used)
 * Contains a scrollable area
 * -----------------------------------------------------------------------------------------------*/

const DrawerContainer = styled(Flex)<{
  $animationDirection: DrawerContentSlotProps['animationDirection'];
}>`
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: ${({ theme }) => theme.spaces[2]};
  max-width: 100%;
  z-index: 1000;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    &[data-state='open'] {
      animation: ${({ $animationDirection }) =>
          $animationDirection === 'up' ? slideUpFromBottomIn : slideLeftFromRightIn}
        ${DRAWER_CLOSE_ANIMATION_MS}ms cubic-bezier(0.32, 0.72, 0, 1) forwards;
    }

    &[data-state='closed'] {
      animation: ${({ $animationDirection }) =>
          $animationDirection === 'up' ? slideUpFromBottomOut : slideLeftFromRightOut}
        ${DRAWER_CLOSE_ANIMATION_MS}ms cubic-bezier(0.32, 0.72, 0, 1) forwards;
      pointer-events: none;
    }
  }
`;

interface AnimatedBodyProps {
  $isVisible: boolean;
}

const AnimatedBody = styled(Box)<AnimatedBodyProps>`
  display: grid;
  flex: 1;
  min-height: 0;
  grid-template-rows: ${({ $isVisible }) => ($isVisible ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s ease-in-out;

  > div {
    overflow: ${({ $isVisible }) => ($isVisible ? 'auto' : 'hidden')};
    min-height: 0;
  }
`;

interface DrawerContentSlotProps extends BoxProps {
  animationDirection: 'left' | 'up';
}

const DrawerContentSlot = ({ children, animationDirection, ...props }: DrawerContentSlotProps) => {
  return (
    <Dialog.Content
      forceMount
      onPointerDownOutside={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}
      asChild
    >
      <DrawerContainer
        $animationDirection={animationDirection}
        maxWidth="100%"
        maxHeight="100vh"
        {...props}
      >
        <Flex
          direction="column"
          flex="1"
          minHeight={0}
          width="100%"
          background="neutral0"
          borderRadius={1}
          shadow="popupShadow"
          overflow="hidden"
          borderColor="neutral150"
          borderStyle="solid"
          borderWidth="1px"
        >
          {children}
        </Flex>
      </DrawerContainer>
    </Dialog.Content>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Drawer.Body - composable body slot (collapsible, scrollable)
 * -----------------------------------------------------------------------------------------------*/

interface DrawerBodyProps extends React.PropsWithChildren {
  isExpanded?: boolean;
}

const DrawerBody = ({ children, isExpanded = true }: DrawerBodyProps) => {
  return (
    <AnimatedBody $isVisible={isExpanded} data-collapsed={!isExpanded}>
      <ScrollArea>{children}</ScrollArea>
    </AnimatedBody>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Drawer.CloseButton - composable close icon button (Cross icon by default)
 * -----------------------------------------------------------------------------------------------*/

const CloseIconButton = styled(IconButton)`
  &:hover {
    background: transparent;
  }
`;

export interface DrawerCloseButtonProps extends React.PropsWithChildren {
  onClose: () => void;
  label?: string;
}

const DrawerCloseButton = ({ onClose, label, children }: DrawerCloseButtonProps) => {
  const { formatMessage } = useIntl();
  const labelMessage = label ?? formatMessage({ id: 'global.close', defaultMessage: 'Close' });
  return (
    <CloseIconButton onClick={onClose} label={labelMessage} variant="ghost">
      {children ?? <Cross />}
    </CloseIconButton>
  );
};

const Drawer = {
  Root: DrawerRoot,
  Content: DrawerContentSlot,
  Body: DrawerBody,
  CloseButton: DrawerCloseButton,
};

export { Drawer };
