(*pp camlp4o *)
(* Read and Write Annotations *)
open Pdfutil

(* Annotation Border Styles *)
type style =
  | NoStyle
  | Solid
  | Dashed
  | Beveled
  | Inset
  | UnderlineStyle

type border =
  {width : float;
   vradius : float;
   hradius : float;
   style : style;
   dasharray : int array}

type subtype =
  | Text
  | Link
  | FreeText
  | Line
  | Square
  | Circle
  | Polygon
  | PolyLine
  | Highlight
  | Underline
  | Squiggly
  | StrikeOut
  | Stamp
  | Caret
  | Ink
  | Popup of t
  | FileAttachment
  | Sound
  | Movie
  | Widget
  | Screen
  | PrinterMark
  | TrapNet
  | Watermark
  | ThreeDee
  | Unknown

(* Main type. 'rest' contains the raw annotation dictionary with the exception
of the entries corresponding to the other items in the record. *)
and t =
  {subtype : subtype;
   annot_contents : string option;
   subject : string option;
   rectangle : float * float * float * float;
   border : border;
   colour : (int * int * int) option;
   annotrest : Pdf.pdfobject}

(* Read a single annotation *)
let rec read_annotation pdf annot =
  let subtype =
    match Pdf.lookup_direct pdf "/Subtype" annot with
    | Some (Pdf.Name "/Text") -> Text
    | Some (Pdf.Name "/FreeText") -> FreeText
    | Some (Pdf.Name "/Popup") ->
        (* Look up /Parent. If exists, include it *)
        begin match Pdf.direct pdf annot with
        | Pdf.Dictionary d ->
            begin match lookup "/Parent" d with
            | Some (Pdf.Indirect i) -> Popup (read_annotation pdf (Pdf.Indirect i))
            | _ -> Unknown
            end
        | _ -> raise (Pdf.PDFError "read_annotation failed")
        end
    | Some (Pdf.Name "/Stamp") -> Stamp
    | Some (Pdf.Name "/Link") -> Link
    | _ -> Unknown
  in let contents =
    match Pdf.lookup_direct pdf "/Contents" annot with
    | Some (Pdf.String s) -> Some s
    | _ -> None
  in let subject =
    match Pdf.lookup_direct pdf "/Subj" annot with
    | Some (Pdf.String s) -> Some s
    | _ -> None
  in let rectangle =
    Pdf.parse_rectangle (Pdf.lookup_fail "No /rect in annot" pdf "/Rect" annot)
  in let border =
    match Pdf.lookup_direct pdf "/BS" annot with
    | Some bsdict ->
        let width =
          match Pdf.lookup_direct pdf "/W" bsdict with
          | Some x -> Pdf.getnum x
          | _ -> 1.
        in let style =
          match Pdf.lookup_direct pdf "/S" bsdict with
          | Some (Pdf.Name "/S") -> Solid
          | Some (Pdf.Name "/D") -> Dashed
          | Some (Pdf.Name "/B") -> Beveled
          | Some (Pdf.Name "/I") -> Inset
          | Some (Pdf.Name "/U") -> UnderlineStyle
          | _ -> NoStyle
        in let dasharray =
          match Pdf.lookup_direct pdf "/D" bsdict with
          | Some (Pdf.Array dash) ->
              Array.of_list (map int_of_float (map Pdf.getnum (map (Pdf.direct pdf) dash)))
          | _ -> [||]
        in
          {width = width;
           vradius = 0.;
           hradius = 0.;
           style = style;
           dasharray = dasharray}
    | None ->
        match Pdf.lookup_direct pdf "/Border" annot with
        | Some (Pdf.Array [h; v; w]) ->
            {width = Pdf.getnum (Pdf.direct pdf w);
             vradius = Pdf.getnum (Pdf.direct pdf v);
             hradius = Pdf.getnum (Pdf.direct pdf h);
             style = NoStyle;
             dasharray = [||]}
        | Some (Pdf.Array [h; v; w; Pdf.Array dash]) ->
            {width = Pdf.getnum (Pdf.direct pdf w);
             vradius = Pdf.getnum (Pdf.direct pdf v);
             hradius = Pdf.getnum (Pdf.direct pdf h);
             style = NoStyle;
             dasharray = Array.of_list (map int_of_float (map Pdf.getnum (map (Pdf.direct pdf) dash)))}
        | _ ->
            {width = 1.;
             vradius = 0.;
             hradius = 0.;
             style = NoStyle;
             dasharray = [||]}
  in let colour =
    match Pdf.lookup_direct pdf "/C" annot with
    | Some (Pdf.Array [r; g; b]) ->
        Some (int_of_float (Pdf.getnum (Pdf.direct pdf r)),
              int_of_float (Pdf.getnum (Pdf.direct pdf g)),
              int_of_float (Pdf.getnum (Pdf.direct pdf b)))
    | _ -> None
  in let annotrest =
    match Pdf.direct pdf annot with
    | Pdf.Dictionary entries ->
        Pdf.Dictionary
          (lose (fun (k, _) -> mem k ["/Subtype"; "/Contents"; "/Rect"; "/Border"]) entries)
    | _ -> raise (Pdf.PDFError "Bad annotation dictionary")
  in
    {subtype = subtype;
     annot_contents = contents;
     subject = subject;
     rectangle = rectangle;
     border = border;
     colour = colour;
     annotrest = annotrest}

let get_popup_parent pdf annotation =
  match Pdf.direct pdf annotation with
  | Pdf.Dictionary d ->
      begin match lookup "/Parent" d with
      | Some (Pdf.Indirect i) -> Some i
      | _ -> None
      end
  | _ -> raise (Pdf.PDFError "Pdfannot.get_popup_parent: this is not a dictionary")

(* Read the annotations from a page. *)
let annotations_of_page pdf page =
  match Pdf.lookup_direct pdf "/Annots" page.Pdfpage.rest with
  | Some (Pdf.Array annotations) ->
      (* We don't read annotations which are parents of Popup annotations - they
      will be caught anyway. This seems to be the right thing to do, but will
      need more advice. *)
      let popup_parents =
        option_map (get_popup_parent pdf) annotations
      in
        map
          (read_annotation pdf)
          (lose (function Pdf.Indirect i -> mem i popup_parents | _ -> false) annotations)
  | _ -> []

(* Add an annotation to a page *)
(*i let add_annotation pdf page annotation = () i*)


