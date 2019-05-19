/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FaAt, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import AvailableHeight from './AvailableHeight';

function Row({
  Icon,
  text,
  label
}: {
  Icon: any;
  text: string;
  label: string;
}) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        margin-bottom: 1.5rem;
      `}
    >
      <div
        css={css`
          width: 40px;
          margin-right: 1rem;
        `}
      >
        <Icon
          css={css`
            color: #0f89e2;
            font-size: 2.5rem;
          `}
        />
      </div>
      <div>
        <div>{text}</div>
        <div
          css={css`
            color: #777;
            font-size: 1rem;
          `}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

export default function PreviewView() {
  return (
    <AvailableHeight>
      <div
        css={css`
          align-items: center;
          color: #111;
          display: flex;
          height: 100%;
          justify-content: center;
        `}
      >
        <div
          css={css`
            width: 350px;
            height: 600px;
            background-color: #fff;
          `}
        >
          <div
            css={css`
              width: 350px;
              height: 200px;
              background-color: #aaa;
            `}
          />
          <div
            css={css`
              padding: 1rem;
              font-size: 1.2rem;
            `}
          >
            <h1
              css={css`
                font-size: 2rem;
                margin-bottom: 4rem;
              `}
            >
              Michael Jewell
            </h1>
            <Row Icon={FaMapMarkerAlt} label="Location" text="Santa Barbara" />
            <Row Icon={FaAt} label="Email" text="michaeljewell9911@gmail.com" />
            <Row Icon={FaPhone} label="Phone" text="(805) 284-1748" />
          </div>
        </div>
      </div>
    </AvailableHeight>
  );
}
