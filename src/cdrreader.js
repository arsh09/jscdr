//
// Copyright (c) 2021 ADLINK Technology Inc.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0, or the Apache License, Version 2.0
// which is available at https://www.apache.org/licenses/LICENSE-2.0.
//
// SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
//
import ByteBuffer from 'bytebuffer';

export class CDRReader {
    constructor(byteBuf) {
        this.buf = byteBuf;
        this.reprId = this.buf.readUint16();
        this.reprOpt = this.buf.readUint16();
        this.buf.LE((this.reprId & 0x0001) == 0x0001);
    }

    readByte() {
        return this.buf.readByte();
    }

    uint8(){ return this.readByte(); }

    readBytes(count) {
        var slice = this.buf.slice(this.pos, this.pos + count);
        this.buf.skip(count);
        return slice;
    }

    align(alignment) {
        // Note: The 4 starting bytes (for Representation Id and Options) are not considered for alignment
        var modulo = (this.buf.offset + 4) % alignment;
        if (modulo > 0) {
            this.buf.skip(alignment - modulo);
        }
    }

    readInt16() {
        this.align(2);
        return this.buf.readInt16();
    }

    int16(){return this.readInt16(); }

    readUint16() {
        this.align(2);
        return this.buf.readUint16();
    }

    uint16(){return this.readUint16();}

    readInt32() {
        this.align(4);
        return this.buf.readInt32();
    }

    int32(){return this.readInt32();}

    readUint32() {
        this.align(4);
        return this.buf.readUint32();
    }

    uint32(){return this.readUint32();}

    readInt64() {
        this.align(8);
        return this.buf.readInt64();
    }

    int64(){ return this.readInt64(); }

    readUint64() {
        this.align(8);
        return this.buf.readUint64();
    }

    uint64(){ return this.readUint64() }

    readFloat32() {
        this.align(4);
        return this.buf.readFloat32();
    }

    float32(){ this.readFloat32(); }

    readFloat64() {
        this.align(8);
        return this.buf.readFloat64();
    }

    float64() { return this.readFloat64(); }

    readChar() {
        return String.fromCharCode(this.readByte());
    }

    readString() {
        var len = this.readUint32();
        // Note: skip null-termination char to construct JavaScript String
        var str = this.buf.readUTF8String(len - 1);
        this.buf.skip(1);
        return str;
    }

    string() { return this.readString() ; }

    readSequenceLength() {
        return this.readUint32();
    }

    sequenceLength(){ return this.readSequenceLength(); }

}
