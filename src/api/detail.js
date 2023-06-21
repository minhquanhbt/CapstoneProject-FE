import instance from './axios'
//get all product v1
export const getKanjiData = async (argument) => instance.post('/v1/kanji/detail', argument)
//get all product v1
export const getVocabularyData = async (argument) => instance.post('/v1/vocabulary/detail', argument)