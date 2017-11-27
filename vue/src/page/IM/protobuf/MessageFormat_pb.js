/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.Message', null, global);
goog.exportSymbol('proto.Notify', null, global);
goog.exportSymbol('proto.Push', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Notify = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Notify.repeatedFields_, null);
};
goog.inherits(proto.Notify, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Notify.displayName = 'proto.Notify';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Notify.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Notify.prototype.toObject = function(opt_includeInstance) {
  return proto.Notify.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Notify} msg The msg instance to transform.
 * @return {!Object}
 */
proto.Notify.toObject = function(includeInstance, msg) {
  var f, obj = {
    cid: jspb.Message.getField(msg, 1),
    topic: jspb.Message.getField(msg, 2),
    buzid: jspb.Message.getField(msg, 3),
    content: jspb.Message.getField(msg, 4),
    receiversList: jspb.Message.getField(msg, 5)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Notify}
 */
proto.Notify.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Notify;
  return proto.Notify.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Notify} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Notify}
 */
proto.Notify.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTopic(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setBuzid(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.addReceivers(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Notify.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Notify.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Notify} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.Notify.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeString(
      3,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getReceiversList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      5,
      f
    );
  }
};


/**
 * required int64 cid = 1;
 * @return {number}
 */
proto.Notify.prototype.getCid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.Notify.prototype.setCid = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.Notify.prototype.clearCid = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Notify.prototype.hasCid = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required string topic = 2;
 * @return {string}
 */
proto.Notify.prototype.getTopic = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.Notify.prototype.setTopic = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.Notify.prototype.clearTopic = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Notify.prototype.hasTopic = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * required string buzId = 3;
 * @return {string}
 */
proto.Notify.prototype.getBuzid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.Notify.prototype.setBuzid = function(value) {
  jspb.Message.setField(this, 3, value);
};


proto.Notify.prototype.clearBuzid = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Notify.prototype.hasBuzid = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * required string content = 4;
 * @return {string}
 */
proto.Notify.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.Notify.prototype.setContent = function(value) {
  jspb.Message.setField(this, 4, value);
};


proto.Notify.prototype.clearContent = function() {
  jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Notify.prototype.hasContent = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * repeated string receivers = 5;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<string>}
 */
proto.Notify.prototype.getReceiversList = function() {
  return /** @type {!Array.<string>} */ (jspb.Message.getField(this, 5));
};


/** @param {!Array.<string>} value */
proto.Notify.prototype.setReceiversList = function(value) {
  jspb.Message.setField(this, 5, value || []);
};


/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.Notify.prototype.addReceivers = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};


proto.Notify.prototype.clearReceiversList = function() {
  this.setReceiversList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Push = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Push, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Push.displayName = 'proto.Push';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Push.prototype.toObject = function(opt_includeInstance) {
  return proto.Push.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Push} msg The msg instance to transform.
 * @return {!Object}
 */
proto.Push.toObject = function(includeInstance, msg) {
  var f, obj = {
    content: jspb.Message.getField(msg, 1),
    pushtime: jspb.Message.getField(msg, 2)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Push}
 */
proto.Push.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Push;
  return proto.Push.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Push} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Push}
 */
proto.Push.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setPushtime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Push.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Push.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Push} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.Push.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * required string content = 1;
 * @return {string}
 */
proto.Push.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.Push.prototype.setContent = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.Push.prototype.clearContent = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Push.prototype.hasContent = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required int64 pushTime = 2;
 * @return {number}
 */
proto.Push.prototype.getPushtime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.Push.prototype.setPushtime = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.Push.prototype.clearPushtime = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Push.prototype.hasPushtime = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Message = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Message, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Message.displayName = 'proto.Message';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Message.prototype.toObject = function(opt_includeInstance) {
  return proto.Message.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Message} msg The msg instance to transform.
 * @return {!Object}
 */
proto.Message.toObject = function(includeInstance, msg) {
  var f, obj = {
    content: jspb.Message.getField(msg, 1),
    sendTime: jspb.Message.getField(msg, 2),
    receiverUid: jspb.Message.getField(msg, 3),
    senderUid: jspb.Message.getField(msg, 4),
    memberId: jspb.Message.getField(msg, 5),
    messageId: jspb.Message.getField(msg, 6),
    guid: jspb.Message.getField(msg, 7),
    sessionId: jspb.Message.getField(msg, 8),
    businessType: jspb.Message.getField(msg, 9)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Message}
 */
proto.Message.prototype.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Message;
  return proto.Message.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Message} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Message}
 */
proto.Message.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSendTime(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setReceiverUid(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSenderUid(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setMemberId(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessageId(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setGuid(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionId(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBusinessType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Message.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Message.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Message} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.Message.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeString(
      3,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeString(
      4,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeString(
      5,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeString(
      6,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 7));
  if (f != null) {
    writer.writeString(
      7,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 8));
  if (f != null) {
    writer.writeString(
      8,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 9));
  if (f != null) {
    writer.writeInt64(
      9,
      f
    );
  }
};


/**
 * required string content = 1;
 * @return {string}
 */
proto.Message.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.Message.prototype.setContent = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.Message.prototype.clearContent = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Message.prototype.hasContent = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required int64 send_time = 2;
 * @return {number}
 */
proto.Message.prototype.getSendTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.Message.prototype.setSendTime = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.Message.prototype.clearSendTime = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Message.prototype.hasSendTime = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * required string receiver_uid = 3;
 * @return {string}
 */
proto.Message.prototype.getReceiverUid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.Message.prototype.setReceiverUid = function(value) {
  jspb.Message.setField(this, 3, value);
};


proto.Message.prototype.clearReceiverUid = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Message.prototype.hasReceiverUid = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string sender_uid = 4;
 * @return {string}
 */
proto.Message.prototype.getSenderUid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.Message.prototype.setSenderUid = function(value) {
  jspb.Message.setField(this, 4, value);
};


proto.Message.prototype.clearSenderUid = function() {
  jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Message.prototype.hasSenderUid = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional string member_id = 5;
 * @return {string}
 */
proto.Message.prototype.getMemberId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.Message.prototype.setMemberId = function(value) {
  jspb.Message.setField(this, 5, value);
};


proto.Message.prototype.clearMemberId = function() {
  jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Message.prototype.hasMemberId = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * required string message_id = 6;
 * @return {string}
 */
proto.Message.prototype.getMessageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/** @param {string} value */
proto.Message.prototype.setMessageId = function(value) {
  jspb.Message.setField(this, 6, value);
};


proto.Message.prototype.clearMessageId = function() {
  jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Message.prototype.hasMessageId = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional string guid = 7;
 * @return {string}
 */
proto.Message.prototype.getGuid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/** @param {string} value */
proto.Message.prototype.setGuid = function(value) {
  jspb.Message.setField(this, 7, value);
};


proto.Message.prototype.clearGuid = function() {
  jspb.Message.setField(this, 7, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Message.prototype.hasGuid = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * required string session_id = 8;
 * @return {string}
 */
proto.Message.prototype.getSessionId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/** @param {string} value */
proto.Message.prototype.setSessionId = function(value) {
  jspb.Message.setField(this, 8, value);
};


proto.Message.prototype.clearSessionId = function() {
  jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Message.prototype.hasSessionId = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * required int64 business_type = 9;
 * @return {number}
 */
proto.Message.prototype.getBusinessType = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/** @param {number} value */
proto.Message.prototype.setBusinessType = function(value) {
  jspb.Message.setField(this, 9, value);
};


proto.Message.prototype.clearBusinessType = function() {
  jspb.Message.setField(this, 9, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Message.prototype.hasBusinessType = function() {
  return jspb.Message.getField(this, 9) != null;
};


goog.object.extend(exports, proto);
