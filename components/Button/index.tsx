import styled from '@emotion/styled'
import { ElementType } from 'react'
import { css } from '@emotion/react'

import { colors } from '@components/common/colors'
import { spaces } from '@components/common/spaces'

interface ButtonProps {
  small?: boolean
  disabled?: boolean
}

interface ButtonCtaProps extends ButtonProps {
  inverted?: boolean
}

interface ButtonTagProps extends ButtonProps {
  white?: boolean
  selected?: boolean
}

type ButtonVariant = 'cta' | 'tag'

const mapVariantToStyles = ({
  variant,
  inverted,
  white,
  small,
  as,
  disabled,
  selected
}: ButtonCtaProps &
  ButtonTagProps & { variant?: ButtonVariant } & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: ElementType<any>
  }) => {
  const hasHoverState =
    (as === 'button' || as === 'a' || as === undefined) && !disabled

  switch (variant) {
    case 'tag':
      return css`
        font-weight: 500;
        background: ${colors.platinum};
        border: 1px solid ${colors.platinum};
        color: ${colors.onyx};

        ${white &&
        css`
          font-weight: 700;
          background: ${colors.white};
          border: 1px solid ${colors.onyx};
          color: ${colors.onyx};
        `}

        ${selected &&
        white &&
        css`
          background: ${colors.onyx};
          color: ${colors.white};
        `}

        ${small &&
        css`
          font-size: 1.2rem;
          line-height: 1.2rem;
          padding: ${spaces.xxs - 2}px ${spaces.xxs}px;
        `}

        ${disabled &&
        css`
          cursor: default;
          opacity: 0.5;
        `}

        ${hasHoverState &&
        css`
          &:hover {
            cursor: pointer;

            ${white &&
            css`
              background: ${colors.onyx};
              color: ${colors.white};
            `}

            ${selected &&
            white &&
            css`
              background: ${colors.white};
              color: ${colors.onyx};
            `}
          }
        `}
      `
    default:
      return css`
        border-radius: 100rem;
        border: 1px solid ${colors.onyx};
        background: ${colors.onyx};
        color: ${colors.white};

        ${inverted &&
        css`
          border: 1px solid ${colors.white};
          background: ${colors.onyx};
          color: ${colors.white};
        `}

        ${small &&
        css`
          font-size: 1.2rem;
          line-height: 1.2rem;
          padding: ${spaces.xxs - 2}px ${spaces.xxs}px;
        `}

        ${disabled &&
        css`
          cursor: default;
          opacity: 0.5;
        `}

        ${hasHoverState &&
        css`
          &:hover {
            cursor: pointer;
            background: ${colors.white};
            color: ${colors.onyx};

            ${inverted &&
            css`
              background: ${colors.white};
              color: ${colors.onyx};
            `}
          }
        `}
      `
  }
}

const COMMON_STYLES = css`
  display: inline-block;
  padding: ${spaces.xxs}px ${spaces.sm}px;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 2rem;
  text-transform: uppercase;
  cursor: default;

  &:hover {
    text-decoration: none;
  }
`

export const Button = {
  Cta: styled.button<ButtonCtaProps>`
    ${COMMON_STYLES}
    ${(props) => mapVariantToStyles({ variant: 'cta', ...props })}
  `,
  Tag: styled.button<ButtonTagProps>`
    ${COMMON_STYLES}
    ${(props) => mapVariantToStyles({ variant: 'tag', ...props })}
  `
}
