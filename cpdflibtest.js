cpdf = require('./cpdf');
cpdfjs = require('./cpdflibwrapper');

/* CHAPTER 0. Preliminaries */
console.log("***** CHAPTER 0. Preliminaries");
console.log("---cpdf_startup()");
console.log("---cpdf_version()");
console.log("version = %s", cpdfjs.version());
console.log("---cpdf_setFast()");
cpdfjs.setFast();
console.log("---cpdf_setSlow()");
cpdfjs.setSlow();
console.log("---cpdf_clearError()");

/* CHAPTER 1. Basics */
console.log("***** CHAPTER 1. Basics");
console.log("---cpdf_fromFile()");
var pdf = cpdfjs.fromFile("testinputs/cpdflibmanual.pdf", "");
console.log("---cpdf_fromFileLazy()");
var pdf2 = cpdfjs.fromFileLazy("testinputs/cpdflibmanual.pdf", "");
console.log("---cpdf_toMemory()");
var mempdf = cpdfjs.toMemory(pdf, false, false);
console.log("---END OF CHAPTER 1");
/*console.log("---cpdf_fromMemory()");
var frommem = cpdfjs.fromMemory(mempdf, "");
cpdfjs.toFile(frommem, "testoutputs/01fromMemory.pdf", false, false);*/
/*console.log("---cpdf_fromMemoryLazy()");
cpdfjs.Pdf frommemlazy = cpdfjs.fromMemoryLazy(mempdf, "");
cpdfjs.toFile(frommemlazy, "testoutputs/01fromMemoryLazy.pdf", false, false);
cpdfjs.fromMemoryLazyRelease(mempdf);*/
var pdf3 = cpdfjs.blankDocument(153.5, 234.2, 50);
var pdf4 = cpdfjs.blankDocumentPaper(cpdfjs.a4landscape, 50);
console.log("---cpdf: enumerate PDFs");
var n = cpdfjs.startEnumeratePDFs();
for (int x = 0; x < n; x++)
{
    var key = cpdfjs.enumeratePDFsKey(x);
    var info = cpdfjs.enumeratePDFsInfo(x);
}
cpdfjs.endEnumeratePDFs();
console.log("---cpdf_ptOfIn()");
console.log("One inch is %f points", cpdfjs.ptOfIn(1.0));
console.log("---cpdf_ptOfCm()");
console.log("One centimetre is %f points", cpdfjs.ptOfCm(1.0));
console.log("---cpdf_ptOfMm()");
console.log("One millimetre is %f points", cpdfjs.ptOfMm(1.0));
console.log("---cpdf_inOfPt()");
console.log("One point is %f inches", cpdfjs.inOfPt(1.0));
console.log("---cpdf_cmOfPt()");
console.log("One point is %f centimetres", cpdfjs.cmOfPt(1.0));
console.log("---cpdf_mmOfPt()");
console.log("One point is %f millimetres", cpdfjs.mmOfPt(1.0));
console.log("---cpdf_range()");
var range = cpdfjs.range(1, 10);
console.log("---cpdf_all()");
var all = cpdfjs.all(pdf3);
console.log("---cpdf_even()");
var even = cpdfjs.even(all);
console.log("---cpdf_odd()");
var odd = cpdfjs.odd(all);
console.log("---cpdf_rangeUnion()");
var union = cpdfjs.rangeUnion(even, odd);
console.log("---cpdf_difference()");
var diff = cpdfjs.difference(even, odd);
console.log("---cpdf_removeDuplicates()");
var revdup = cpdfjs.removeDuplicates(even);
console.log("---cpdf_rangeLength()");
var length = cpdfjs.rangeLength(even);
console.log("---cpdf_rangeGet()");
var rangeget = cpdfjs.rangeGet(even, 1);
console.log("---cpdf_rangeAdd()");
var rangeadd = cpdfjs.rangeAdd(even, 20);
console.log("---cpdf_isInRange()");
var isin = cpdfjs.isInRange(even, 2);
console.log("---cpdf_parsePagespec()");
var r = cpdfjs.parsePagespec(pdf3, "1-5");
console.log("---cpdf_validatePagespec()");
var valid = cpdfjs.validatePagespec("1-4,5,6");
console.log("Validating pagespec gives %d", valid ? 1 : 0);
console.log("---cpdf_stringOfPagespec()");
var ps = cpdfjs.stringOfPagespec(pdf3, r);
console.log("String of pagespec is %s", ps);
console.log("---cpdf_blankRange()");
var b = cpdfjs.blankRange();
pdf10 = cpdfjs.fromFile("testinputs/cpdflibmanual.pdf", "");
console.log("---cpdf_pages()");
var pages = cpdfjs.pages(pdf10);
console.log("Pages = %i", pages);
console.log("---cpdf_pagesFast()");
var pagesfast = cpdfjs.pagesFast("", "testinputs/cpdflibmanual.pdf");
console.log("Pages = %i", pagesfast);
console.log("---cpdf_toFile()");
cpdfjs.toFile(pdf10, "testoutputs/01tofile.pdf", false, false);
console.log("---cpdf_toFileExt()");
cpdfjs.toFileExt(pdf10, "testoutputs/01tofileext.pdf", false, true, true, true, true);
console.log("---cpdf_isEncrypted()");
var isenc = cpdfjs.isEncrypted(pdf10);
console.log("isencrypted:%i", isenc ? 1 : 0);
console.log("---cpdf_isLinearized()");
var lin = cpdfjs.isLinearized("testinputs/cpdfmanual.pdf");
console.log("islinearized:%i", lin ? 1 : 0);
var pdf400 = cpdfjs.fromFile("testinputs/cpdflibmanual.pdf", "");
var pdf401 = cpdfjs.fromFile("testinputs/cpdflibmanual.pdf", "");
var permissions = [cpdfjs.noEdit];
console.log(permissions.length);
console.log("---cpdf_toFileEncrypted()");
cpdfjs.toFileEncrypted(pdf400, cpdfjs.pdf40bit, permissions, "owner", "user", false, false, "testoutputs/01encrypted.pdf");
console.log("---cpdf_toFileEncryptedExt()");
cpdfjs.toFileEncryptedExt(pdf401, cpdfjs.pdf40bit, permissions, "owner", "user", false, false, true, true, true, "testoutputs/01encryptedext.pdf");
console.log("---cpdf_hasPermission()");
var pdfenc = cpdfjs.fromFile("testoutputs/01encrypted.pdf", "user");
var hasnoedit = cpdfjs.hasPermission(pdfenc, cpdfjs.noEdit);
var hasnocopy = cpdfjs.hasPermission(pdfenc, cpdfjs.noCopy);
console.log("Haspermission %d, %d", hasnoedit ? 1 : 0, hasnocopy ? 1 : 0);
console.log("---cpdf_encryptionKind()");
var enckind = cpdfjs.encryptionKind(pdfenc);
console.log("encryption kind is %d", enckind);
console.log("---cpdf_decryptPdf()");
cpdfjs.decryptPdf(pdf10, "");
console.log("---cpdf_decryptPdfOwner()");
cpdfjs.decryptPdfOwner(pdf10, "");