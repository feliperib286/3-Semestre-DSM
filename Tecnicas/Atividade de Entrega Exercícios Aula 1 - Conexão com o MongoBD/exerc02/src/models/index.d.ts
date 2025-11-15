import mongoose from "mongoose";
declare const DistrictSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: false;
}, {
    name: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
}>, {}, mongoose.ResolveSchemaOptions<{
    _id: false;
}>> & mongoose.FlatRecord<{
    name: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const CitySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: false;
}, {
    name: string;
    districts: mongoose.Types.DocumentArray<{
        name: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
    }> & {
        name: string;
    }>;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    districts: mongoose.Types.DocumentArray<{
        name: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
    }> & {
        name: string;
    }>;
}>, {}, mongoose.ResolveSchemaOptions<{
    _id: false;
}>> & mongoose.FlatRecord<{
    name: string;
    districts: mongoose.Types.DocumentArray<{
        name: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
    }> & {
        name: string;
    }>;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const State: mongoose.Model<{
    name: string;
    cities: mongoose.Types.DocumentArray<{
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }> & {
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }>;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    cities: mongoose.Types.DocumentArray<{
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }> & {
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }>;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    cities: mongoose.Types.DocumentArray<{
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }> & {
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }>;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    cities: mongoose.Types.DocumentArray<{
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }> & {
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }>;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    cities: mongoose.Types.DocumentArray<{
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }> & {
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }>;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    cities: mongoose.Types.DocumentArray<{
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }> & {
        name: string;
        districts: mongoose.Types.DocumentArray<{
            name: string;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            name: string;
        }> & {
            name: string;
        }>;
    }>;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export { State, CitySchema, DistrictSchema };
//# sourceMappingURL=index.d.ts.map