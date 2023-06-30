import instance from './axios'
//get kanji detail
export const getKanjiData = async (argument) => instance.post('/v1/kanji/detail', argument)
//add kanji
export const addKanji = async (argument) => instance.post('/v1/kanji/create', argument)
//edit kanji
export const editKanji = async (argument) => instance.post('/v1/kanji/update', argument)
//get vocabulary detail
export const getVocabularyData = async (argument) => instance.post('/v1/vocabulary/detail', argument)
//add vocabulary
export const addVocabulary = async (argument) => instance.post('/v1/vocabulary/create', argument)
//edit vocabulary
export const editVocabulary = async (argument) => instance.post('/v1/vocabulary/update', argument)