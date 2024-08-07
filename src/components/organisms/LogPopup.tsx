import React, { useState } from 'react'
import LogTable from '../molecules/LogTable'
import { LogArray, LogData } from '../../interfaces/apiTypes'
import { styled } from 'styled-components'
import { COLORS } from '../../styles/colors'
import { Modal } from '../molecules/Modal'
import addIcon from '../../assets/add.svg'
import { downloadLogDataCSV } from '../../utils/downloadLogData'
import TargetColumnSelector from '../atoms/TargetColumnSelector'
import { ShowMenuInLogTable } from '../../interfaces/menuInterface'

const Container = styled.div`
  margin: 16px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  overflow-y: hidden;
  height: 100%;
`

/**
 * 스타일이 적용된 헤더 버튼 컨테이너
 */
const HeaderBtnCont = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: sticky;
  top: 0;
  background-color: ${COLORS.white};
  z-index: 10;
  padding: 16px 0;
`

const DownloadButton = styled.button`
  border-radius: 12px;
  border: 1px solid ${COLORS.gray02};
  background-color: transparent;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 150px;
  margin: 16px 0px 16px 0px;
  cursor: pointer;
`

const IconInButton = styled.img`
  padding-left: 8px;
`

/**
 * 스타일이 적용된 콘텐츠 영역
 */
const Content = styled.div`
  margin-top: 10px;
  overflow-y: auto;
  width: 100%;
`

/**
 * LogPopup 컴포넌트의 props를 정의하는 인터페이스
 */
interface LogPopupProps {
  logs: LogArray
  isShowModal: boolean
  setIsShowModal: (isShowModal: boolean) => void
}

/**
 * LogPopup 컴포넌트
 * @param {LogArray} logs - 로그 데이터 배열
 * @param {boolean} isShowModal - 모달의 보이기/숨기기 상태
 * @param {function} setIsShowModal - 모달의 보이기/숨기기 상태를 설정하는 함수
 */
function LogPopup({ logs, isShowModal, setIsShowModal }: LogPopupProps) {
  const [isShowMenuInLogTable, setIsShowMenuInLogTable] = useState<ShowMenuInLogTable>({
    id: true,
    eventName: true,
    nodeName: true,
    url: true,
    time: true,
    wheelState: true,
    wheelDirection: true,
    whxy: true,
    xpath: true,
    imageUrl: true,
    KeyboardEventState: true,
    KeyboardEventPressedKey: true,
    KeyboardEventKeyCode: true,
  })

  return (
    <Modal isShow={isShowModal} setIsShowModal={setIsShowModal}>
      <Container>
        <HeaderBtnCont>
          <TargetColumnSelector
            isShowMenuInLogTable={isShowMenuInLogTable}
            setIsShowMenuInLogTable={setIsShowMenuInLogTable}
          ></TargetColumnSelector>
          <DownloadButton
            onClick={() => {
              downloadLogDataCSV(logs.data, 'logdata.csv')
            }}
          >
            Download CSV
            <IconInButton src={addIcon}></IconInButton>
          </DownloadButton>
        </HeaderBtnCont>
        <Content>
          <LogTable data={logs.data} isShowMenuInLogTable={isShowMenuInLogTable} />
        </Content>
      </Container>
    </Modal>
  )
}

export default LogPopup
