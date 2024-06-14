/*
 * Copyright 2024 Jiaqi Liu. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Sentry from "@sentry/react";
import { GraphClient } from "nexusgraph-db";
import { NLPClient } from "nexusgraph-nlp";
import { appendToGraphList, updateGraphData } from "nexusgraph-redux";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { container } from "../../../../inversify.config";
import TYPES from "../../../../types";
import { GraphClientContext } from "../../../Contexts";
import { Method } from "./methods";

const nlpClient: NLPClient = container.get<NLPClient>(TYPES.NLPClient);

interface MethodsSelectionModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  newGraphMethod: Method;
}

export function MethodModal(props: MethodsSelectionModalProps): JSX.Element {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const graphClient: GraphClient = useContext(GraphClientContext) as GraphClient;

  const [textInput, setTextInput] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const onHide = () => props.setShowModal(false);
  const onChange = (event: any) => setTextInput(event.target.value);

  useEffect(() => {
    setButtonDisabled(!textInput);
  }, [textInput]);

  const onClick = () => {
    nlpClient.entityExtraction(textInput).then((graph) => {
      if (graph.nodes.length == 0) {
        return;
      }

      graphClient
        .saveOrUpdate({
          name: t("Untitled Graph"),
          nodes: graph.nodes,
          links: graph.links,
        })
        .then((graphState) => {
          const graphId = graphState.id as string;
          const graphName = graphState.name as string;

          dispatch(updateGraphData(graphState));
          dispatch(appendToGraphList({ id: graphId, name: graphName }));

          props.setShowModal(false);
        })
        .catch((error) => Sentry.captureException(error));
    });
  };

  return (
    <Modal show={props.showModal} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">NLP Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="text">
            <Form.Control
              as="textarea"
              required
              type="text"
              value={textInput}
              onChange={onChange}
              placeholder="Please enter some texts"
              defaultValue={"Please enter some texts"}
            />
          </Form.Group>

          <Button data-testid="newGraphButton-NLP" variant="primary" disabled={buttonDisabled} onClick={onClick}>
            {t("Generate Graph")}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
