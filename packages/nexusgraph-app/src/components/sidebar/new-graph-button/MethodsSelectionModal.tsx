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

import { Button, Modal } from "react-bootstrap";
import { Method, NLP_METHOD } from "./methods";

interface MethodsSelectionModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setNewGraphMethod: (newGraphMethod: Method) => void;
}

/**
 * {@link MethodsSelectionModal} is an abstraction layer for showing graph generation stratities in a modal.
 *
 * The implementation uses [react-bootstrap modal](https://react-bootstrap.netlify.app/docs/components/modal). Parent
 * components, however, must be agnostic of this implementation detail. For example, they should not need to pass
 * [react-component Modal API props](https://react-bootstrap.netlify.app/docs/components/modal#modal)
 *
 * @param props  A implementation detail independent React props object
 *
 * @returns a [standard Modal DOM](https://developer.mozilla.org/en-US/docs/Web/CSS/:modal)
 */
export function MethodsSelectionModal(props: MethodsSelectionModalProps) {
  const onHide = () => props.setShowModal(false);

  return (
    <Modal show={props.showModal} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Please select a method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          data-testid="newGraphMethodButton-NLP"
          variant="primary"
          onClick={() => {
            props.setNewGraphMethod(NLP_METHOD);
            props.setShowModal(false);
          }}
        >
          NLP
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
