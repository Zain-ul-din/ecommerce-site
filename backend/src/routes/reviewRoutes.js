// Review Routes
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import {
  RESPONSE,
  BAD_REQ_RESPONSE,
  PRISMA_ERROR_RESPONSE,
} from "../Helper/utilities.js";
import { isValidDate } from "../Helper/utilities.js";
import { HTTP_RESPONSE } from "../Helper/HttpResponse.js";

export const reviewRouter = Router();
const prisma = new PrismaClient();

async function getAll(req, res) {
  const reviews = await prisma.review.findMany({});
  res.send(Object.assign(RESPONSE, { data: reviews }));
}

async function getByPId(req, res) {
  let id = isNaN(req.params.id) ? -1 : parseInt(req.params.id);
  const review = await prisma.review.findMany({ where: { product_id: id } });
  res.send(
    Object.assign(RESPONSE, {
      status: review.length == 0 ? 404 : 200,
      data: review.length == 0 ? null : review,
    })
  );
}

async function getByUEmail(req, res) {
  let id = isNaN(req.params.id) ? -1 : parseInt(req.params.id);
  const review = await prisma.review.findMany({ where: { user_id: id } });
  res.send(
    Object.assign(RESPONSE, {
      status: review.length == 0 ? 404 : 200,
      data: review.length == 0 ? null : review,
    })
  );
}

async function post(req, res) {
  var { review } = req.body;
  review = typeof review !== "object" ? {} : review;
  let error = null;

  const userName = await prisma.user
    .findUnique({ where: { id: parseInt(review.user_id) } })
    .catch((e) => e);

  const newReview = await prisma.review
    .create({
      data: {
        createdAt: isValidDate(new Date(review.createdAt))
          ? review.createdAt
          : new Date().toString(),
        updatedAt: isValidDate(new Date(review.updatedAt))
          ? review.updatedAt
          : new Date().toString(),
        rating: parseFloat(review.rating),
        comment: review.comment,
        product_id: parseInt(review.product_id),
        user_id: parseInt(review.user_id),
        userName: userName.name,
      },
    })
    .catch((err) => (error = err));

  console.log(error);
  if (error)
    res.send(
      Object.assign(BAD_REQ_RESPONSE, { error: PRISMA_ERROR_RESPONSE(error) })
    );
  else
    res.send(
      Object.assign(RESPONSE, {
        data: newReview,
        status: HTTP_RESPONSE.created,
      })
    );
}

async function deleteUnique(req, res) {
  const id = parseInt(req.params.id);
  let error = null;
  await prisma.review
    .delete({ where: { id: id } })
    .catch((err) => (error = err));

  if (error)
    res.send(
      Object.assign(BAD_REQ_RESPONSE, { error: PRISMA_ERROR_RESPONSE(error) })
    );
  else res.send(Object.assign(RESPONSE, { data: {} }));
}

async function updateUnique(req, res) {
  const id = parseInt(req.params.id);
  var { review } = req.body;
  review = typeof review !== "object" ? {} : review;
  let error = null;

  const updatedReview = await prisma.review
    .update({
      where: { id: id },
      data: {
        createdAt: isValidDate(new Date(review.createdAt))
          ? review.createdAt
          : new Date().toString(),
        updatedAt: isValidDate(new Date(review.updatedAt))
          ? review.updatedAt
          : new Date().toString(),
        rating: parseFloat(review.rating),
        comment: review.comment,
      },
    })
    .catch((err) => (error = err));

  if (error)
    res.send(
      Object.assign(BAD_REQ_RESPONSE, { error: PRISMA_ERROR_RESPONSE(error) })
    );
  else res.send(Object.assign(RESPONSE, { data: updatedReview }));
}

reviewRouter
  .get("/", getAll)
  .get("/:pid", getByPId)
  .get("/user/:uid", getByUEmail)
  .post("/", post)
  .delete("/:id", deleteUnique)
  .put("/:id", updateUnique);
