/* eslint-disable import/no-extraneous-dependencies */
import { v4 as uuidv4 } from 'uuid';

export default function getId() {
    const id = uuidv4();
    return id;
}
