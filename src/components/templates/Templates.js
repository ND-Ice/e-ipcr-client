import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit, FiPlus } from "react-icons/fi";

import {
  getTemplates,
  setCurrentId,
  setTargetIndicator,
} from "../../store/templates";

import {
  AddCoreAccomplishment,
  AddCoreFunction,
  AddCoreSuccessIndicator,
  AddSupportAccomplishment,
  AddSupportFunction,
  EditCoreAccomplishment,
  EditCoreFunction,
  EditCoreSuccessIndicator,
  EditSupportAccomplishment,
  EditSupportFunction,
  EditSupportSuccessIndicator,
  AddSupportSuccessIndicator,
  TemplateIcon,
  AddCoreRating,
  AddSupportRating,
  RatingSummary,
  AddCoreFunctionRemarks,
  AddSupportFunctionRemarks,
} from ".";
import FilePicker from "../FilePicker/FilePicker";

export default function Templates() {
  const { list } = useSelector(getTemplates);
  const dispatch = useDispatch();
  const {
    coreFunctions,
    supportFunctions,
    _id,
    coreFunctionsMeasure,
    supportFunctionsMeasure,
    comments,
  } = list?.filter((template) => template?.isUse)[0];

  //   state variable
  const [showAddCoreFunction, setShowAddCoreFunction] = useState(false);
  const [showEditCoreFunction, setShowEditCoreFunction] = useState(false);
  const [showEditCoreSuccessIndicator, setShowEditCoreSuccessIndicator] =
    useState(false);
  const [showAddCoreAccomplishment, setShowAddCoreAccomplishment] =
    useState(false);
  const [showEditCoreAccomplishment, setShowEditCoreAccomplishment] =
    useState(false);
  const [showAddSupportFunction, setShowAddSupportFunction] = useState(false);
  const [showAddSupportAccomplishment, setShowAddSupportAccomplishment] =
    useState(false);
  const [showEditSupportAccomplishment, setShowEditSupportAccomplishment] =
    useState(false);
  const [showEditSupportFunction, setShowEditSupportFunction] = useState(false);
  const [showEditSupportSuccessIndicator, setShowEditSupportSuccessIndicator] =
    useState(false);
  const [showAddCoreSuccessIndicator, setShowAddCoreSuccessIndicator] =
    useState(false);
  const [showAddSupportSuccessIndicator, setShowAddSupportSuccessIndicator] =
    useState(false);
  const [showAddCoreRating, setShowAddCoreRating] = useState(false);
  const [showAddSupportRating, setShowAddSupportRating] = useState(false);
  const [showAddCoreFunctionRemarks, setShowAddCoreFunctionRemarks] =
    useState(false);
  const [showAddSupportFunctionRemarks, setShowAddSupportFunctionRemarks] =
    useState(false);

  return (
    <Container>
      <Table bordered hover>
        <thead>
          <tr className="text-center">
            <td colSpan={8}>INDIVIDUAL PERFORMANCE COMMITMENT REVIEW</td>
          </tr>
          <tr className="text-center">
            <td>Statement of Functions</td>
            <td>SuccessIndicator (Target Measure)</td>
            <td>Actual Accomplishments</td>
            <td colSpan={5}>Rating</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3} className=" text-white bg-dark">
              <div className="d-flex align-items-center">
                Core Functions - 90%
                {coreFunctionsMeasure > 0 && (
                  <TemplateIcon
                    className="ms-3"
                    icon={FiPlus}
                    color="#ffffff"
                    bg="#0891b2"
                    onClick={() => setShowAddCoreFunction(true)}
                  />
                )}
              </div>
            </td>
            <td className="text-center text-white bg-dark">Quality</td>
            <td className="text-center text-white bg-dark">Timeliness</td>
            <td className="text-center text-white bg-dark">Efficiency</td>
            <td className="text-center text-white bg-dark">Average</td>
            <td className="text-center text-white bg-dark">Remarks</td>
          </tr>

          {/*==================================== core functions ==========================================*/}
          {coreFunctions?.map((cf) => (
            <React.Fragment key={cf?.id}>
              <tr>
                {/* core function title */}
                <TableData colSpan={8}>
                  <Title>
                    {cf?.title} - ({cf?.percentage}%){" "}
                    <IconContainer>
                      <TemplateIcon
                        icon={FiPlus}
                        onClick={() => {
                          setShowAddCoreSuccessIndicator(true);
                          return dispatch(setCurrentId({ currentId: cf?.id }));
                        }}
                      />
                      <TemplateIcon
                        icon={FiEdit}
                        onClick={() => {
                          setShowEditCoreFunction(true);
                          return dispatch(setCurrentId({ currentId: cf?.id }));
                        }}
                      />
                    </IconContainer>
                  </Title>
                  {/* function description */}
                  <p className="m-0"> {cf?.description}</p>
                </TableData>
              </tr>
              {cf?.successIndicators.map((sIn) => (
                <tr key={sIn?.id}>
                  <td></td>
                  <TableData
                    onClick={() => {
                      setShowEditCoreSuccessIndicator(true);
                      return dispatch(
                        setTargetIndicator({ funcId: cf?.id, succId: sIn?.id })
                      );
                    }}
                  >
                    {sIn?.title}
                    <p className="m-0">{sIn?.description}</p>
                  </TableData>
                  {/* actual accomplishments */}
                  <td>
                    {sIn?.actualAccomplishments?.title ? (
                      <Accomplishment
                        onClick={() => {
                          setShowEditCoreAccomplishment(true);
                          return dispatch(
                            setTargetIndicator({
                              funcId: cf?.id,
                              succId: sIn?.id,
                            })
                          );
                        }}
                      >
                        <p className="m-0">
                          {sIn?.actualAccomplishments?.title}
                        </p>
                        <p className="m-0">
                          {sIn?.actualAccomplishments?.description}
                        </p>
                      </Accomplishment>
                    ) : (
                      <TemplateIcon
                        icon={FiPlus}
                        fg="#ffffff"
                        bg="#0891b2"
                        onClick={() => {
                          setShowAddCoreAccomplishment(true);
                          return dispatch(
                            setTargetIndicator({
                              funcId: cf?.id,
                              succId: sIn?.id,
                            })
                          );
                        }}
                      />
                    )}
                  </td>
                  {/* quality timeliness efficiency */}
                  {/* ================ quality ======================== */}
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.quality ? (
                      sIn?.actualAccomplishments?.rating?.quality
                    ) : (
                      <TemplateIcon
                        icon={FiPlus}
                        fg="#ffffff"
                        bg="#0891b2"
                        onClick={() => {
                          dispatch(
                            setTargetIndicator({
                              funcId: cf?.id,
                              succId: sIn?.id,
                            })
                          );
                          return setShowAddCoreRating(true);
                        }}
                      />
                    )}
                  </td>
                  {/* ============================= timelines =========================== */}
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.timeliness ? (
                      sIn?.actualAccomplishments?.rating?.timeliness
                    ) : (
                      <TemplateIcon
                        icon={FiPlus}
                        fg="#ffffff"
                        bg="#0891b2"
                        onClick={() => {
                          dispatch(
                            setTargetIndicator({
                              funcId: cf?.id,
                              succId: sIn?.id,
                            })
                          );
                          return setShowAddCoreRating(true);
                        }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.efficiency ? (
                      sIn?.actualAccomplishments?.rating?.efficiency
                    ) : (
                      <TemplateIcon
                        icon={FiPlus}
                        fg="#ffffff"
                        bg="#0891b2"
                        onClick={() => {
                          dispatch(
                            setTargetIndicator({
                              funcId: cf?.id,
                              succId: sIn?.id,
                            })
                          );
                          return setShowAddCoreRating(true);
                        }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.average.toFixed(2)}
                  </td>
                  {/* remarks */}
                  <td>
                    {sIn?.remarks ? (
                      sIn?.remarks
                    ) : (
                      <TemplateIcon
                        icon={FiPlus}
                        fg="#ffffff"
                        bg="#0891b2"
                        onClick={() => {
                          dispatch(
                            setTargetIndicator({
                              funcId: cf?.id,
                              succId: sIn?.id,
                            })
                          );
                          return setShowAddCoreFunctionRemarks(true);
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}

          {/* ============================== support functions ==================================*/}
          <tr>
            <td colSpan={8} className="text-white bg-dark">
              <div className="d-flex align-items-center">
                Support Functions - 10%
                {supportFunctionsMeasure > 0 && (
                  <TemplateIcon
                    className="ms-3"
                    icon={FiPlus}
                    color="#ffffff"
                    bg="#0891b2"
                    onClick={() => setShowAddSupportFunction(true)}
                  />
                )}
              </div>
            </td>
          </tr>
          {supportFunctions?.map((sf) => (
            <React.Fragment key={sf?.id}>
              <tr>
                <TableData colSpan={8}>
                  <Title>
                    {sf?.title} - ({sf?.percentage}%)
                    <IconContainer>
                      <TemplateIcon
                        icon={FiPlus}
                        onClick={() => {
                          setShowAddSupportSuccessIndicator(true);
                          return dispatch(setCurrentId({ currentId: sf?.id }));
                        }}
                      />
                      <TemplateIcon
                        icon={FiEdit}
                        onClick={() => {
                          setShowEditSupportFunction(true);
                          return dispatch(setCurrentId({ currentId: sf?.id }));
                        }}
                      />
                    </IconContainer>
                  </Title>
                  <p className="m-0">{sf?.description}</p>
                </TableData>
              </tr>
              {sf?.successIndicators.map((sIn) => (
                <tr key={sIn?.id}>
                  <td></td>
                  <TableData
                    onClick={() => {
                      setShowEditSupportSuccessIndicator(true);
                      return dispatch(
                        setTargetIndicator({ funcId: sf?.id, succId: sIn?.id })
                      );
                    }}
                  >
                    {sIn?.title}
                    <p className="m-0">{sIn?.description}</p>
                  </TableData>
                  {/* actual accomplishment */}
                  <td>
                    {sIn?.actualAccomplishments?.title ? (
                      <Accomplishment
                        onClick={() => {
                          setShowEditSupportAccomplishment(true);
                          return dispatch(
                            setTargetIndicator({
                              funcId: sf?.id,
                              succId: sIn?.id,
                            })
                          );
                        }}
                      >
                        <p className="m-0">
                          {sIn?.actualAccomplishments?.title}
                        </p>
                        <p className="m-0">
                          {sIn?.actualAccomplishments?.description}
                        </p>
                      </Accomplishment>
                    ) : (
                      <TemplateIcon
                        icon={FiPlus}
                        fg="#ffffff"
                        bg="#0891b2"
                        onClick={() => {
                          setShowAddSupportAccomplishment(true);
                          return dispatch(
                            setTargetIndicator({
                              funcId: sf?.id,
                              succId: sIn?.id,
                            })
                          );
                        }}
                      />
                    )}
                  </td>
                  {/* quality timeliness efficiency */}
                  {/* ========================= quality ================================== */}
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.quality ? (
                      sIn?.actualAccomplishments?.rating?.quality
                    ) : (
                      <TemplateIcon
                        icon={FiPlus}
                        fg="#ffffff"
                        bg="#0891b2"
                        onClick={() => {
                          dispatch(
                            setTargetIndicator({
                              funcId: sf?.id,
                              succId: sIn?.id,
                            })
                          );
                          return setShowAddSupportRating(true);
                        }}
                      />
                    )}
                  </td>
                  {/* =========================== timeliness  =========================*/}
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.timeliness ? (
                      sIn?.actualAccomplishments?.rating?.timeliness
                    ) : (
                      <TemplateIcon
                        icon={FiPlus}
                        fg="#ffffff"
                        bg="#0891b2"
                        onClick={() => {
                          dispatch(
                            setTargetIndicator({
                              funcId: sf?.id,
                              succId: sIn?.id,
                            })
                          );
                          return setShowAddSupportRating(true);
                        }}
                      />
                    )}
                  </td>
                  {/* =========================== Efficiency  =========================*/}
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.efficiency ? (
                      sIn?.actualAccomplishments?.rating?.efficiency
                    ) : (
                      <TemplateIcon
                        icon={FiPlus}
                        fg="#ffffff"
                        bg="#0891b2"
                        onClick={() => {
                          dispatch(
                            setTargetIndicator({
                              funcId: sf?.id,
                              succId: sIn?.id,
                            })
                          );
                          return setShowAddSupportRating(true);
                        }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.average.toFixed(2)}
                  </td>
                  {/* remarks */}
                  <td>
                    {sIn?.remarks ? (
                      sIn?.remarks
                    ) : (
                      <TemplateIcon
                        icon={FiPlus}
                        fg="#ffffff"
                        bg="#0891b2"
                        onClick={() => {
                          dispatch(
                            setTargetIndicator({
                              funcId: sf?.id,
                              succId: sIn?.id,
                            })
                          );
                          return setShowAddSupportFunctionRemarks(true);
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}

          {/* ======================= rating summary ========================= */}
          <RatingSummary
            id={_id}
            comments={comments}
            coreFunctions={coreFunctions}
            supportFunctions={supportFunctions}
          />
        </tbody>
      </Table>

      <FilePicker id={_id} />

      {/* ======================== core functions ======================== */}
      <Modal
        show={showAddCoreFunctionRemarks}
        onHide={() => setShowAddCoreFunctionRemarks(false)}
      >
        <AddCoreFunctionRemarks id={_id} open={setShowAddCoreFunctionRemarks} />
      </Modal>
      <Modal
        centered
        show={showAddCoreFunction}
        onHide={() => setShowAddCoreFunction(false)}
      >
        <AddCoreFunction id={_id} open={setShowAddCoreFunction} />
      </Modal>
      <Modal
        centered
        show={showAddCoreSuccessIndicator}
        onHide={() => setShowAddCoreSuccessIndicator(false)}
      >
        <AddCoreSuccessIndicator
          id={_id}
          open={setShowAddCoreSuccessIndicator}
        />
      </Modal>
      <Modal
        centered
        show={showEditCoreFunction}
        onHide={() => setShowEditCoreFunction(false)}
      >
        <EditCoreFunction
          id={_id}
          coreFunctions={coreFunctions}
          open={setShowEditCoreFunction}
        />
      </Modal>
      <Modal
        centered
        show={showEditCoreSuccessIndicator}
        onHide={() => setShowEditCoreSuccessIndicator(false)}
      >
        <EditCoreSuccessIndicator
          id={_id}
          coreFunctions={coreFunctions}
          open={setShowEditCoreSuccessIndicator}
        />
      </Modal>
      <Modal
        centered
        show={showAddCoreAccomplishment}
        onHide={() => setShowAddCoreAccomplishment(false)}
      >
        <AddCoreAccomplishment
          id={_id}
          coreFunctions={coreFunctions}
          open={setShowAddCoreAccomplishment}
        />
      </Modal>
      <Modal
        centered
        show={showEditCoreAccomplishment}
        onHide={() => setShowEditCoreAccomplishment(false)}
      >
        <EditCoreAccomplishment
          id={_id}
          coreFunctions={coreFunctions}
          open={setShowEditCoreAccomplishment}
        />
      </Modal>
      <Modal
        centered
        show={showAddCoreRating}
        onHide={() => setShowAddCoreRating(false)}
      >
        <AddCoreRating
          id={_id}
          coreFunctions={coreFunctions}
          open={setShowAddCoreRating}
        />
      </Modal>

      {/* ======================== support functions ======================== */}
      <Modal
        show={showAddSupportFunctionRemarks}
        onHide={() => setShowAddSupportFunctionRemarks(false)}
      >
        <AddSupportFunctionRemarks
          id={_id}
          open={setShowAddSupportFunctionRemarks}
        />
      </Modal>
      <Modal
        centered
        show={showAddSupportFunction}
        onHide={() => setShowAddSupportFunction(false)}
      >
        <AddSupportFunction
          id={_id}
          supportFunctions={supportFunctions}
          open={setShowAddSupportFunction}
        />
      </Modal>
      <Modal
        centered
        show={showEditSupportFunction}
        onHide={() => setShowEditSupportFunction(false)}
      >
        <EditSupportFunction
          id={_id}
          supportFunctions={supportFunctions}
          open={setShowEditSupportFunction}
        />
      </Modal>
      <Modal
        centered
        show={showAddSupportSuccessIndicator}
        onHide={() => setShowAddSupportSuccessIndicator(false)}
      >
        <AddSupportSuccessIndicator
          id={_id}
          open={setShowAddSupportSuccessIndicator}
        />
      </Modal>
      <Modal
        centered
        show={showEditSupportSuccessIndicator}
        onHide={() => setShowEditSupportSuccessIndicator(false)}
      >
        <EditSupportSuccessIndicator
          id={_id}
          supportFunctions={supportFunctions}
          open={setShowEditSupportSuccessIndicator}
        />
      </Modal>
      <Modal
        centered
        show={showAddSupportAccomplishment}
        onHide={() => setShowAddSupportAccomplishment(false)}
      >
        <AddSupportAccomplishment
          id={_id}
          supportFunctions={supportFunctions}
          open={setShowAddSupportAccomplishment}
        />
      </Modal>
      <Modal
        centered
        show={showEditSupportAccomplishment}
        onHide={() => setShowEditSupportAccomplishment(false)}
      >
        <EditSupportAccomplishment
          id={_id}
          supportFunctions={supportFunctions}
          open={setShowEditSupportAccomplishment}
        />
      </Modal>
      <Modal
        centered
        show={showAddSupportRating}
        onHide={() => setShowAddSupportRating(false)}
      >
        <AddSupportRating
          id={_id}
          supportFunctions={supportFunctions}
          open={setShowAddSupportRating}
        />
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem;
`;

const IconContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const TableData = styled.td`
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

const Accomplishment = styled.div`
  cursor: pointer;
`;
